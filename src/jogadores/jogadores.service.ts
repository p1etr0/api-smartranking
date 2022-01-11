import { Injectable, Logger, NotFoundException, Query } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidV4 } from 'uuid'

@Injectable()
export class JogadoresService {

  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name)

  async criarAtualizarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<void>{
    const { email } = criarJogadorDTO

    const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email)

    if(jogadorEncontrado){
      this.atualizar(jogadorEncontrado, criarJogadorDTO)
    }else{
      this.criar(criarJogadorDTO)
    }
  }


  async consultarTodosJogadores(): Promise<Jogador[]>{

    return this.jogadores
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador>{
    const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email)

    if(!jogadorEncontrado){
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado!`)
    }

    return jogadorEncontrado
  }

  async deletarJogadorPorEmail(email: string): Promise<void>{
    
    const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);

    this.jogadores = this.jogadores.filter((jogador) => jogador.email !== jogadorEncontrado.email)

  }

  private async criar(criarJogadorDTO: CriarJogadorDTO): Promise<void>{
    const {nome, telefoneCelular, email} = criarJogadorDTO

    const jogador: Jogador = {
      _id: uuidV4(),
      nome,
      telefoneCelular,
      email,
      posicaoRanking: 1,
      ranking: "A",
      urlFotoJogador: "www.google.com.br/foto123.jpg"
    }

    this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
    this.jogadores.push(jogador)
  }


  private atualizar(jogadorEncontrado: Jogador, criarJogadorDTO: CriarJogadorDTO): void{
    const {nome} = criarJogadorDTO

    jogadorEncontrado.nome = nome;
  }
}
