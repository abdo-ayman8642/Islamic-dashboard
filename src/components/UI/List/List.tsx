import { Card, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { Order, SortOrder } from 'constants/enums';
import useApp from 'hooks/useApp';
import useSelected from 'hooks/useSelected';
import { Feature } from 'models/api';
import { HeadCell } from 'models/app';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

interface Props {
    headCells: HeadCell[];
    getBodyCells: (row: any) => any[];
    feature?: Feature;
    data: any[];
    canSelect?: boolean;
    canSelectAll?: boolean;
    getSelected?: (selected: Set<string>) => void;
    canEdit?: boolean;
    onChangeRowsPerPage?: (rowsPerPage: number) => void;
    getRedirectUrl?: (row: any) => string;
    darkHeader?: boolean;
    removeHeader?: boolean;
}
interface IState {
    orderBy: keyof any;
    order: Order;
    page: number;
    rowsPerPage: number;
}

const INITIAL_STATE: IState = {
    order: SortOrder.DESC,
    orderBy: 'created_at',
    page: 0,
    rowsPerPage: 10
};

const List: React.FC<Props> = ({
    headCells,
    darkHeader = false,
    removeHeader = false,
    getBodyCells,
    feature,
    data,
    canSelect = false,
    canSelectAll = true,
    getSelected,
    canEdit = true,
    onChangeRowsPerPage,

    getRedirectUrl
}) => {
    const { push } = useApp();
    const [state, setState] = useState(INITIAL_STATE);
    const { order, orderBy, page, rowsPerPage } = state;
    const { selected, setSelected } = useSelected();
    const [sortedData, setSortedData] = useState<any[]>(data);

    React.useEffect(
        () => {
            getSelected && getSelected(selected);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selected]
    );

    useEffect(() => {
        setSortedData(data);
    }, [data]);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelected = [];

        for (let item of data!) {
            newSelected.push(item.id);
        }

        selected.size === 0 ? setSelected(new Set<string>(newSelected)) : setSelected(new Set<string>());
    };

    const handleSelect = (id: string) => {
        const newSelect = new Set(selected);

        if (!canSelectAll) newSelect.clear();
        newSelect.has(id) ? newSelect.delete(id) : newSelect.add(id);
        setSelected(newSelect);
    };

    const handleSort = (property: keyof any, numeric: boolean, isDate: boolean = false) => {
        const isAsc = orderBy === property && order === SortOrder.ASC;
        setState({ ...state, order: isAsc ? SortOrder.DESC : SortOrder.ASC, orderBy: property });
        if (isDate) {
            // handle sort by date
            const sorted = data.sort((a: any, b: any) => {
                if (new Date(a[property]) < new Date(b[property])) {
                    return isAsc ? -1 : 1;
                }
                if (new Date(a[property]) > new Date(b[property])) {
                    return isAsc ? 1 : -1;
                }
                return 0;
            });

            setSortedData(sorted);
        } else {
            const sorted = data.sort((a: any, b: any) => {
                if (!a[property]) return 1;
                if (!b[property]) return -1;
                if (typeof a[property] === 'number' && typeof b[property] === 'number') {
                    if (a[property] < b[property]) {
                        return isAsc ? -1 : 1;
                    }
                    if (a[property] > b[property]) {
                        return isAsc ? 1 : -1;
                    }
                    return 0;
                } else {
                    if (a[property]?.toLowerCase() < b[property]?.toLowerCase()) {
                        return isAsc ? -1 : 1;
                    }
                    if (a[property]?.toLowerCase() > b[property]?.toLowerCase()) {
                        return isAsc ? 1 : -1;
                    }
                    return 0;
                }
            });
            setSortedData(sorted);
        }
    };

    // arrange body cells based on the head cells
    const arrangeBodyCells = (cells: any[]) => {
        const bodyCells: any[] = [];
        for (let headCell of headCells) {
            const cell = cells.find((cell) => cell.id === headCell.id);
            if (cell) {
                bodyCells.push(cell.element);
            }
        }
        return bodyCells;
    };

    const handleEdit = (row: any) => push(`/${feature!.slug!}/${row.id ? row.id : row.Id}`);
    const handleClickRow = (row: any) => {

        if (canEdit) handleEdit(row);
    };

    const handleChangePage = (newPage: number) => {
        setState({ ...state, page: newPage });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, page: 0, rowsPerPage: parseInt(event.target.value, 10) });
    };


    return (
        <Card sx={{ p: 0 }}>
            <TableContainer>
                <Table>
                    {!removeHeader && (
                        <TableHead sx={{ backgroundColor: `${darkHeader ? '#3d3d3d' : 'inherit'}` }}>
                            <TableRow>
                                {canSelect && (
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selected.size > 0 && selected.size < data?.length}
                                            checked={selected.size > 0 && selected.size === data?.length}
                                            onChange={handleSelectAll}
                                            disabled={!canSelectAll}
                                            inputProps={{
                                                'aria-label': 'select all listings'
                                            }}
                                        />
                                    </TableCell>
                                )}
                                {headCells?.map((headCell: any, i: number) => (
                                    <TableCell key={i} align={'left'} padding={headCell.disablePadding ? 'none' : 'normal'}>
                                        <TableSortLabel
                                            sx={{
                                                color: `${darkHeader ? 'white !important' : 'inherit'}`,
                                                '&:focus': { color: `${darkHeader ? 'white !important' : 'inherit'}` },
                                                '&:active': { color: `${darkHeader ? 'white !important' : 'inherit'}` },
                                                '&:hover': { color: `${darkHeader ? 'white !important' : 'inherit'}` },
                                                '&:checked': { color: `${darkHeader ? 'white !important' : 'inherit'}` },
                                                '&:visited': { color: `${darkHeader ? 'white !important' : 'inherit'}` },
                                                fontWeight: 700
                                            }}
                                            disabled={headCell?.isNotSortable}
                                            active={orderBy === headCell.id}
                                            direction={order}
                                            onClick={() => handleSort(headCell.id, headCell.numeric, headCell?.isDate!)}>
                                            {headCell.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {sortedData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row: any, index: number) => {
                            const isItemSelected = selected.has(row?.id!);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover={canEdit}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={index}
                                    selected={isItemSelected}
                                    onClick={() => handleClickRow(row)}
                                    sx={{
                                        cursor: canSelect || canEdit ? 'pointer' : 'default',
                                        "&:hover": {
                                            backgroundColor: `${canSelect || canEdit ? '#F0F5FD' : 'inherit'} !important`
                                        },
                                        backgroundColor: 'inherit'
                                    }}>
                                    {canSelect && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                onChange={() => handleSelect(row.id)}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell>
                                    )}
                                    {arrangeBodyCells(getBodyCells(row))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid
                container
                justifyContent={'flex-end'}
                alignItems={'center'}
                sx={{
                    margin: 'auto',
                    py: 2
                }}>
                <Pagination count={Math.ceil(data.length / rowsPerPage)} page={page + 1} onChange={(event, value) => handleChangePage(value - 1)} showFirstButton showLastButton />
                <FormControl sx={{ ml: 2, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Rows per page</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rowsPerPage}
                        label="Rows per page"
                        onChange={(e: any) => {
                            handleChangeRowsPerPage(e);
                            onChangeRowsPerPage && onChangeRowsPerPage(parseInt(e.target.value as string));
                        }}
                        size="small"
                        sx={{
                            maxWidth: 100
                        }}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Card>
    );
};

export default List;
