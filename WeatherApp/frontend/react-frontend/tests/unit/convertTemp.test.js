// Yksinkertainen lämpötilamuunnosfunktio
function convertCtoF(celsius) {
    return celsius * 9 / 5 + 32;
  }
  
  test("muuntaa 0°C oikein Fahrenheitiksi", () => {
    expect(convertCtoF(0)).toBe(32);
  });
  
  test("muuntaa -40°C oikein Fahrenheitiksi", () => {
    expect(convertCtoF(-40)).toBe(-40);
  });
  