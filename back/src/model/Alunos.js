//Classe Alunos
export default class Alunos {
    _id;
    _nome;
    _matricula;
    _turma;
    _cr;

    constructor(pId,pNome,pMatricula,pTurma,pCr){
        this._id=pId;
        this._nome=pNome;
        this._matricula=pMatricula;
        this._turma=pTurma;
        this.cr=pCr;
    }
    
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get nome() {
        return this._nome;
    }
    set nome(value) {
        this._nome = value;
    }
    get matricula() {
        return this._matricula;
    }
    set matricula(value) {
        this._matricula = value;
    }
    get turma() {
        return this._turma;
    }
    set turma(value) {
        this._turma = value;
    }
    get cr() {
        return this._cr;
    }
    set cr(value) {
        this._cr = value;
    }
}