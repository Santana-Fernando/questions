import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Questions from '../../services/QuestoesTalk.json';
import { TablePagination } from '@mui/material';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Question from '../question/question';

import '../../styles/table/style.css';

const rows = Questions.questoes

export default function TableQuestions() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [searchBar, setSearchBar] = useState("")
    const [open, setOpen] = useState(false);
    const [Id, setId] = useState('');

    const handleOpen = (id: string) => {
        setOpen(true);
        setId(id);
    }

    const handleClose = () => {
        setOpen(false);
        setId('');
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBar(event.target.value)
    };
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    
    function getDificuldade(nivel: string) {
        if(nivel === '1') return 'Fácil'
        if(nivel === '2') return 'Médio'
        if(nivel === '3') return 'Difícil'
    }
    

    return (
        <>
            <Box>
            <TextField
                id="outlined-multiline-flexible"
                label="Multiline"
                multiline
                maxRows={4}
                onChange={handleChange}
            />
            </Box>
            <Box>Lista de Questões</Box>
            <TableContainer component={Paper} className="tableContainer">
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableHeaderCell darkBlue" align="right">Pergunta</TableCell>
                            <TableCell className="tableHeaderCell darkBlue" align="right">Tema</TableCell>
                            <TableCell className="tableHeaderCell darkBlue" align="right">Dificuldade</TableCell>
                            <TableCell className="tableHeaderCell darkBlue" align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='bodyTable'>
                    {rows.filter((val: any) => {
                        if(searchBar == ""){
                            return val
                        }else if(val.Pergunta.toLowerCase().includes(searchBar.toLowerCase())) {
                            return val
                        }
                    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                        <TableRow
                        key={row.ID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell className="lightBlue" align="right">{row.Pergunta}</TableCell>
                        <TableCell className="lightBlue" align="right">{row.TipoTema}</TableCell>
                        <TableCell className="lightBlue" align="right">{getDificuldade(row.Dificuldade)}</TableCell>
                        <TableCell className="lightBlue" align="right"><Button className="darkBlue" variant="contained" onClick={() => handleOpen(row.ID)}>Ver Questão</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            <TablePagination 
                rowsPerPageOptions={[2, 4, 6, 8]}
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Question Id={Id}/>
                </Box>
                
            </Modal>
        </>
    );
}