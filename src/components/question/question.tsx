import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Questions from '../../services/QuestoesTalk.json';
import Radio from '@mui/material/Radio';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IPropID {
  Id: string;
}

export default function Question(props: IPropID) {
  const { Id } = props;
  const [Questao, setQuestao] = useState<any>({})
  const [Respostas, setRespostas] = useState<any>([])
  const [selectedValue, setSelectedValue] = useState('');
  
  const findQuestao = async () => {
    let questao: any = await Questions.questoes.find(q => q.ID == Id);
    return questao
  }
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let respostaCorreta = event.target.name == "false" ? false : true;

    if(respostaCorreta) toast.success("Resposta Certa", {theme: "dark"})
    if(!respostaCorreta) toast.error("Resposta Errada", {theme: "dark"})
    
    setSelectedValue(event.target.value);
  }

  findQuestao().then((res: any) => {
    setQuestao(res)
    setRespostas(res.Respostas)
  });

  return (
    
    <div>
        <ToastContainer />
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {Questao.Pergunta}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <img
              src={Questao.Imagem}
              loading="lazy"
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
            {Respostas.map((row: any, index: number) => (
              <Typography >
                <Radio
                  checked={selectedValue === row.Texto}
                  onChange={handleChange}
                  value={row.Texto}
                  name={row.Correta.toString()}
                />
                {row.Texto}
              </Typography>
            ))}
            
          </Typography>
        </Box>
    </div>
  );
}