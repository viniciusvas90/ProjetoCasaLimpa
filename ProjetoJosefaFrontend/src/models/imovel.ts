import { Endereco } from "./endereco";

export class Imovel {
  id: number;
  descricao: string;
  tipo: string;
  qtdComodos: number;
  metrosQuadrados: number;
  temAnimais: boolean;
  animais: string;
  temCriancas: boolean;
  qtdCriancas: string;
  endereco: Endereco;
}
