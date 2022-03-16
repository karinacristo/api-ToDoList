import calculadora from '../logica/calculadora.js';

test("Testar se 10 + 10 = 20", () => {
    expect(calculadora.soma(10, 10)).toBe(20)
})