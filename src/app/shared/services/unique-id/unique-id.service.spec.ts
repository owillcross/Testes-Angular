import { TestBed } from '@angular/core/testing';

import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => { // use o .name pois, caso o nome seja alterado no futuro, o teste não fica com o nome incorreto.
  let service: UniqueIdService;

  beforeEach(() => { //antes de cada it (cada teste), ele executa esses comandos (no caso, reseta a instância service)
    service = new UniqueIdService(); //cria-se uma instância do serviço
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefix`, () => { // padrão de descrição do teste: "tal coisa" deve "fazer isso" quando "essas condições forem atendidas"
    const id = service.generateUniqueIdWithPrefix('app') //essa variável recebe o resultado o uso o método

    //expect(id).toContain('app-') //espera-se que a variável contenha "app-" (mas como quero o prefixo então posso ter falsos positivos)
    expect(id.startsWith('app-')).toBeTrue(); //espera-se que seja verdadeiro que a variável comece com "app-"

    /* OBS: há três formas verificar tipos boolean:

    1º expect(true).toBeTrue();

      É usado para casos literais e quando a varíavel é atribuída diretamente com true (mais recomendado):
        const x = true
        expect(x).toBeTrue(); vai dar certo
        expect(new Boolean(true)).toBeTrue(true); vai dar errado

    2º expect(true).toBe(true);

      É usado para casos literais, que sejam do mesmo tipo e apontem para o mesmo espaço de memória:
        const x = new Boolean(true)
        expect(x).toBe(x); vai dar certo
        expect(new Boolean(true)).toBe(new Boolean(true)); vai dar errado porque são dois objetos diferentes, cada um em um espaço diferente da memória

    3º expect(true).toBeTruthy();

      É mais geral, compara somente o valor, ou seja, se é true, não importa o que seja:
        const x = true
        expect(x).toBeTruthy(x); vai dar certo
        expect(x).toBeTruthy(true); vai dar certo
        expect(new Boolean(true)).toBeTruthy(true); vai dar certo
        expect(new Boolean(true)).toBeTruthy(new Boolean(true); vai dar certo

    */

  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should not generate duplicate ids when called often`, () => {
    const ids = new Set(); // o Set é uma estrutura de dados (array) que não permite repetições. Então, se alguma id gerada for repetida, ele não vai deixar ser incluída no array.
    for(let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app')); //sendo id uma instância de Set, adicione os ids com prefixo (que só serão incluídos se forem únicos)
    }

    expect(ids.size).toBe(50); //espera-se que o tamanho do array is seja igual a 50 (pois se for menor quer dizer que houve geração de um ID repetido que não foi incluído)
  });

  it(`#${UniqueIdService.prototype.getNumberOfGenaratedUniqueIds.name} should return the number od generateIds when called`, () => {
    service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');

    expect(service.getNumberOfGenaratedUniqueIds()).toBe(2); //espera-se o retorno desse método seja 2 (pois foi chamado duas vezes nesse teste)
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should throw when called with empty`, () => {

    const emptyValues = [null, undefined, '', '0', '1'];

    emptyValues.forEach(emptyValues => {
      expect(() => service.generateUniqueIdWithPrefix(emptyValues))
      .withContext(`Empty value: ${emptyValues} should be invalid`) //pelo contexto, o valor vazio que pode ter deixar de ter atendido a expectativa foi "tal". Isso é para sabermos qual item que está impactando.
      .toThrow();//no caso de uma exceção, deve ser chamada dentro de uma função. Espera-se o retorno seja Throw (jogar um erro) quando o valor do prefixo for inválido (ou seja, acione o throw Error('Prefix can not be empty'))
    })
  });
});
