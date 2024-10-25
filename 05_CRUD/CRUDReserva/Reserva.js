class Reserva {
    constructor(codigoReserva, dataCheckin, dataCheckout, cliente, quarto, posicaoNaLista) {
        this.codigoReserva = codigoReserva;
        this.dataCheckin = dataCheckin;
        this.dataCheckout = dataCheckout;
        this.cliente = cliente;
        this.quarto = quarto;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}
