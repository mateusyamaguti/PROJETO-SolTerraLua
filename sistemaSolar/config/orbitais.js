sala = { // todos em metros
    'larguraSala': 3,
    'comprimentoSala': 7.5,
    'alturaSala': 5,
    'alturaBeiral': 3,
    'tamanhoCeu': 90
}

escalas = {
    'a1': {
        'altura': 45, // [m]
        'diametroSolar': 1.2,  //fração do diâmetro de júpiter
        'raioOrbital': {
            'potencia': 1,    
            'max': 40 // [m]
        },
        'diametroPlanetario': {
            'potencia': 1/5,
            'max': 0.25 // [m]
        },
        'periodoRotacao': {
            'potencia': 1/6,
            'max': 5 // [s]
        },
        'periodoOrbital': {
            'potencia': 1,
            'max': 1200 // [s]
        }
    },
    'a2': {
        'altura': 1.5, // [m]        
        'diametroSolar': 1.2,  //fração do diâmetro de júpiter
        'raioOrbital': {
            'potencia': 0,    
            'max': 3 // [m]
        },
        'diametroPlanetario': {
            'potencia': 1/4,
            'max': 0.6 // [m]
        }
    },
    'a3': {
        'altura': 1.5, // [m]
        'diametroSolar': 1.2,  //fração do diâmetro de júpiter
        'raioOrbital': {
            'potencia': 1/5,    
            'max': 3.5 // [m]
        },
        'diametroPlanetario': {
            'potencia': 1,
            'max': 0.5 // [m]
        }
    },
    'a4': {'altura': 13} // [m]
};

raioOrbital = { //em UA
    'sol': 0,
    'mer': 0.4,
    'ven': 0.7,
    'ter': 1.0,
    'mar': 1.5,
    'jup': 5.2,
    'sat': 9.6,
    'ura': 19.2,
    'net': 30.1
};
diametroPlanetario = { //em km
    'sol': 1.392e6,
    'mer': 4870,
    'ven': 12104,
    'ter': 12742,
    'mar': 6792,
    'jup': 142984,
    'sat': 120536,
    'ura': 51118,
    'net': 49528
};
inclinacaoEixo = { //em graus
    'sol': 0,
    'mer': 0.04,
    'ven': 177.3,
    'ter': 23.4,
    'mar': 25.2,
    'jup': 3.1,
    'sat': 26.7,
    'ura': 97.8,
    'net': 28.3
};
periodoRotacao = { //em dias
    'sol': 25.1,
    'mer': 58.6,
    'ven': 243,
    'ter': 1,
    'mar': 1,
    'jup': 0.4,
    'sat': 0.4,
    'ura': 0.7,
    'net': 0.7
};
periodoOrbital = { //em dias
    'sol': 365.3,
    'mer': 88,
    'ven': 224.7,
    'ter': 365.3,
    'mar': 687,
    'jup': 4332,
    'sat': 10832,
    'ura': 30799,
    'net': 60190
};
