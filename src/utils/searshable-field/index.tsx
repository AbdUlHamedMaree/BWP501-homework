import React, { useRef, useState } from "react";
import { Button, Input } from "antd";
import { ColumnType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';

type Func =
    (dataIndex: string) =>
        {
            filterDropdown: ColumnType<any>['filterDropdown'],
            filterIcon: ColumnType<any>['filterIcon'],
            onFilter: ColumnType<any>['onFilter'],
            onFilterDropdownVisibleChange: ColumnType<any>['onFilterDropdownVisibleChange'],
            render: ColumnType<any>['render'],
        }

export const useSearchableField: Func = (dataIndex) => {
    const [state, setState] = useState<{
        searchText: string,
        searchedColumn: string,
    }>({
        searchText: '',
        searchedColumn: '',
    })

    const searchInput = useRef<Input>(null)

    const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
        confirm();
        setState({
            searchText: selectedKeys[0].toString(),
            searchedColumn: dataIndex,
        });
    };

    const handleReset = (clearFilters: (() => void) | undefined) => {
        clearFilters && clearFilters();
        setState({ ...state, searchText: '' });
    };

    return ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <div className='flex space-x-1'>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </div>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: text =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    })
};