import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css'
import api from '../../services/api'

import { toast } from "react-toastify";

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "0d44fb9b7640b129404bf39a3e6ddd57",
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                 setFilme(response.data);
                 setLoading(false);
            })
            .catch(()=> {
                console.log("Filme não encontrado")
                navigate("/", { replace: true})
                return
            })
        }

        loadFilmes();

        return() => {
            console.log("COMPONENTE FOI DESMONTADO");
        }
    }, [])

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvo = JSON.parse(minhaLista) || [];

        const hasFilmes = filmesSalvo.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilmes) {
            toast.success("ESSE FILME JÁ ESTA NA LISTA");
            return;
        }

        filmesSalvo.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvo));
        toast.warn("FILME SALVO COM SUCESSO")
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
        
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average}</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title}`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;