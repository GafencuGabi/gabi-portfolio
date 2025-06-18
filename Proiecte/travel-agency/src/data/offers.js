const offers = [
  {
    id: '1',
    title: 'Vacanță în Grecia - Santorini',
    description: '7 nopți all-inclusive în insula magică Santorini.',
    price: 899,
    image: process.env.PUBLIC_URL + '/grecia.jpg',
    details: 'Zbor inclus, hotel 4 stele cu vedere la mare, mic dejun și cină inclusă. Vizitează satele tradiționale Oia și Fira, plajele cu nisip negru și apusurile spectaculoase.',
    duration: '7 nopți',
    location: 'Santorini, Grecia',
    category: 'Plajă'
  },
  {
    id: '2',
    title: 'City Break Paris',
    description: '3 nopți la hotel central, mic dejun inclus.',
    price: 499,
    image: process.env.PUBLIC_URL + '/paris.jpg',
    details: 'Vizitează Turnul Eiffel, Louvre, Notre-Dame și multe altele. Hotel 3 stele în centrul Parisului, la 5 minute de metrou.',
    duration: '3 nopți',
    location: 'Paris, Franța',
    category: 'City Break'
  },
  {
    id: '3',
    title: 'Safari în Kenya',
    description: 'Aventură de 10 zile în parcurile naționale din Kenya.',
    price: 1299,
    image: process.env.PUBLIC_URL + '/kenya.jpg',
    details: 'Safari în Masai Mara, Amboseli și Tsavo. Cazare în lodge-uri de lux, toate mesele incluse, ghid local experimentat.',
    duration: '10 nopți',
    location: 'Kenya, Africa',
    category: 'Aventură'
  },
  {
    id: '4',
    title: 'Croazieră Mediterana',
    description: '8 nopți pe Marea Mediterană cu opriri în 6 țări.',
    price: 1099,
    image: process.env.PUBLIC_URL + '/croaziera.jpg',
    details: 'Croazieră de lux cu opriri în Italia, Spania, Franța, Monaco, Grecia și Turcia. All-inclusive la bord.',
    duration: '8 nopți',
    location: 'Marea Mediterană',
    category: 'Croazieră'
  },
  {
    id: '5',
    title: 'Tokyo & Kyoto',
    description: '6 nopți în Japonia - tradiție și modernitate.',
    price: 1199,
    image: process.env.PUBLIC_URL + '/japan.jpg',
    details: 'Descoperă contrastul dintre Tokyo-ul modern și Kyoto-ul tradițional. Hoteluri centrale, mic dejun inclus, ghid local.',
    duration: '6 nopți',
    location: 'Japonia',
    category: 'Cultură'
  },
  {
    id: '6',
    title: 'Bali Paradise',
    description: '9 nopți în paradisul tropical din Bali.',
    price: 799,
    image: process.env.PUBLIC_URL + '/bali.jpg',
    details: 'Resort 5 stele cu spa inclus, plaje private, excursii la temple și terase de orez. All-inclusive.',
    duration: '9 nopți',
    location: 'Bali, Indonezia',
    category: 'Plajă'
  }
];

export default offers;