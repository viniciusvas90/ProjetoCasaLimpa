import { Imovel } from "./imovel";
import { Usuario } from "./usuario";

export class Cliente {
    id : number;
    nome: string;
    cpf: string;
    telefone: string;
    autorizado: boolean;
    dataCadastro: Date;
    dataAutorizado: Date;
    fotoBase64Image : string;
    usuario : Usuario;
    imoveis: Array<Imovel>;
  }