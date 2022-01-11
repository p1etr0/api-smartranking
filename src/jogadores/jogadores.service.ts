import { Injectable, Logger, NotFoundException, Query } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidV4 } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

  constructor(@InjectModel('Jogador') private readonly jogadorModule: Model<Jogador>){}

  private readonly logger = new Logger(JogadoresService.name)

  async criarAtualizarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<void>{
    const { email } = criarJogadorDTO

    const jogadorEncontrado = await this.jogadorModule.findOne({email}).exec();

    if(jogadorEncontrado){
      this.atualizar(criarJogadorDTO)
    }else{
      this.criar(criarJogadorDTO)
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]>{

    return await this.jogadorModule.find().exec()
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador>{
    const jogadorEncontrado = await this.jogadorModule.findOne({email}).exec();

    if(!jogadorEncontrado){
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado!`)
    }

    return jogadorEncontrado
  }

  async deletarJogadorPorEmail(email: string): Promise<any>{
    
    return this.jogadorModule.deleteOne({email}).exec()
  }

  private async criar(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador>{

    const jogadorCriado = new this.jogadorModule(criarJogadorDTO)

    return await jogadorCriado.save()
  }


  private async atualizar(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador>{

    return await this.jogadorModule.findOneAndUpdate(
      {email: criarJogadorDTO.email}, 
      {$set: criarJogadorDTO}
    ).exec()
  }
}
