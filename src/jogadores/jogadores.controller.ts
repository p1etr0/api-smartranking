import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly jogadoresService: JogadoresService){

  }

  @Post()
  async criarAtualizarJogador(
    @Body() criarJogadorDTO: CriarJogadorDTO ){
    
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDTO)
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string
  ): Promise<Jogador[] | Jogador>{

    if(email){
      return await this.jogadoresService.consultarJogadorPeloEmail(email)
    }else{
      return await this.jogadoresService.consultarTodosJogadores()
    }

  }


  @Delete()
  async deletarJogador(
    @Query('email') email: string): Promise<void>{
      await this.jogadoresService.deletarJogadorPorEmail(email)
  }
}
