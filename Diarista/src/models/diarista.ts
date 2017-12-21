import { Endereco } from "./endereco";
import { Usuario } from "./usuario";

export class Diarista {
    id : number;
    nome: string;
    cpf: string;
    rg: string;
    telefone: string;
    sindicato: string;
    autorizado: boolean;
    dataCadastro: Date;
    dataAutorizado: Date;
    fotoBase64Image : string;
    usuario : Usuario;
    recomendacoes: Array<{nome:string; contato:string}>;
    endereco: Endereco;
  }