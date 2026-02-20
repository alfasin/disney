import type { PGliteWithLive } from '@electric-sql/pglite/live'

const categories = ['Characters', 'Movies', 'Songs', 'Villains']

const questions: {
  category: string
  question_text: string
  correct_answer: string
  wrong_answers: [string, string, string]
}[] = [
  // Characters
  {
    category: 'Characters',
    question_text: "Who is Simba's father?",
    correct_answer: 'Mufasa',
    wrong_answers: ['Scar', 'Rafiki', 'Zazu'],
  },
  {
    category: 'Characters',
    question_text: 'What kind of animal is Dumbo?',
    correct_answer: 'Elephant',
    wrong_answers: ['Mouse', 'Dog', 'Bear'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Ariel's fish friend?",
    correct_answer: 'Flounder',
    wrong_answers: ['Sebastian', 'Scuttle', 'Nemo'],
  },
  {
    category: 'Characters',
    question_text: 'Who is the fairy in Peter Pan?',
    correct_answer: 'Tinker Bell',
    wrong_answers: ['Flora', 'Fauna', 'Merryweather'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Woody's horse in Toy Story?",
    correct_answer: 'Bullseye',
    wrong_answers: ['Maximus', 'Spirit', 'Khan'],
  },
  {
    category: 'Characters',
    question_text: 'What type of animal is Rajah in Aladdin?',
    correct_answer: 'Tiger',
    wrong_answers: ['Lion', 'Panther', 'Leopard'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Belle's father?",
    correct_answer: 'Maurice',
    wrong_answers: ['Gaston', 'Philippe', 'Lumiere'],
  },
  {
    category: 'Characters',
    question_text: 'Who is the snowman in Frozen?',
    correct_answer: 'Olaf',
    wrong_answers: ['Marshmallow', 'Sven', 'Kristoff'],
  },
  {
    category: 'Characters',
    question_text: "What is Rapunzel's chameleon called?",
    correct_answer: 'Pascal',
    wrong_answers: ['Maximus', 'Flynn', 'Frederic'],
  },
  {
    category: 'Characters',
    question_text: 'What type of fish is Nemo?',
    correct_answer: 'Clownfish',
    wrong_answers: ['Goldfish', 'Angelfish', 'Swordfish'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Cinderella's stepmother?",
    correct_answer: 'Lady Tremaine',
    wrong_answers: ['Lady Gaga', 'Lady Macbeth', 'Lady Grey'],
  },
  {
    category: 'Characters',
    question_text: 'Who is the rat chef in Ratatouille?',
    correct_answer: 'Remy',
    wrong_answers: ['Emile', 'Alfredo', 'Django'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Moana's grandmother?",
    correct_answer: 'Tala',
    wrong_answers: ['Sina', 'Te Fiti', 'Tamatoa'],
  },
  {
    category: 'Characters',
    question_text: "What is Buzz Lightyear's catchphrase?",
    correct_answer: 'To infinity and beyond!',
    wrong_answers: ['Reach for the sky!', 'You are a toy!', 'To the stars!'],
  },
  {
    category: 'Characters',
    question_text: 'What kind of animal is Baloo in The Jungle Book?',
    correct_answer: 'Bear',
    wrong_answers: ['Gorilla', 'Orangutan', 'Panther'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Pocahontas's raccoon friend?",
    correct_answer: 'Meeko',
    wrong_answers: ['Flit', 'Percy', 'Nakoma'],
  },
  {
    category: 'Characters',
    question_text: 'Who is the genie voiced by in the original Aladdin?',
    correct_answer: 'Robin Williams',
    wrong_answers: ['Eddie Murphy', 'Jim Carrey', 'Will Smith'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Elsa and Anna's kingdom?",
    correct_answer: 'Arendelle',
    wrong_answers: ['Corona', 'Agrabah', 'Dunbroch'],
  },
  {
    category: 'Characters',
    question_text: 'What species is Stitch from Lilo & Stitch?',
    correct_answer: 'Alien experiment',
    wrong_answers: ['Dog', 'Koala', 'Mutant'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Tarzan's ape mother?",
    correct_answer: 'Kala',
    wrong_answers: ['Kerchak', 'Terk', 'Tantor'],
  },
  {
    category: 'Characters',
    question_text: 'Who is the clumsy dinosaur in Toy Story?',
    correct_answer: 'Rex',
    wrong_answers: ['Trixie', 'Hamm', 'Slinky'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Mulan's dragon companion?",
    correct_answer: 'Mushu',
    wrong_answers: ['Cri-Kee', 'Khan', 'Little Brother'],
  },
  {
    category: 'Characters',
    question_text: 'What is WALL-E searching for on Earth?',
    correct_answer: 'Plant life',
    wrong_answers: ['Other robots', 'Humans', 'Treasure'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Sleeping Beauty's prince?",
    correct_answer: 'Prince Phillip',
    wrong_answers: ['Prince Eric', 'Prince Charming', 'Prince Naveen'],
  },
  {
    category: 'Characters',
    question_text: 'Who is the forgetful fish in Finding Nemo?',
    correct_answer: 'Dory',
    wrong_answers: ['Gill', 'Bloat', 'Peach'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Hercules's winged horse?",
    correct_answer: 'Pegasus',
    wrong_answers: ['Maximus', 'Khan', 'Angus'],
  },
  {
    category: 'Characters',
    question_text: 'What does Pinocchio want to become?',
    correct_answer: 'A real boy',
    wrong_answers: ['A king', 'A puppet master', 'An actor'],
  },
  {
    category: 'Characters',
    question_text: "What is the name of Bambi's rabbit friend?",
    correct_answer: 'Thumper',
    wrong_answers: ['Flower', 'Faline', 'Ronno'],
  },
  // Movies
  {
    category: 'Movies',
    question_text: 'Which Disney movie features a magic carpet?',
    correct_answer: 'Aladdin',
    wrong_answers: ['The Little Mermaid', 'Beauty and the Beast', 'Mulan'],
  },
  {
    category: 'Movies',
    question_text: 'In which year was Snow White and the Seven Dwarfs released?',
    correct_answer: '1937',
    wrong_answers: ['1940', '1942', '1935'],
  },
  {
    category: 'Movies',
    question_text: "What is the name of the kingdom in Tangled?",
    correct_answer: 'Corona',
    wrong_answers: ['Arendelle', 'Agrabah', 'Atlantica'],
  },
  {
    category: 'Movies',
    question_text: 'Which movie features the song "Hakuna Matata"?',
    correct_answer: 'The Lion King',
    wrong_answers: ['The Jungle Book', 'Tarzan', 'Moana'],
  },
  {
    category: 'Movies',
    question_text: "What is the name of the restaurant in Ratatouille?",
    correct_answer: "Gusteau's",
    wrong_answers: ["Linguini's", "Remy's Bistro", "Le Château"],
  },
  {
    category: 'Movies',
    question_text: 'In which Disney movie do toys come to life?',
    correct_answer: 'Toy Story',
    wrong_answers: ['Pinocchio', 'The Brave Little Toaster', 'Wreck-It Ralph'],
  },
  {
    category: 'Movies',
    question_text: 'Which Disney movie is set in ancient China?',
    correct_answer: 'Mulan',
    wrong_answers: ['Kung Fu Panda', 'Moana', 'Brave'],
  },
  {
    category: 'Movies',
    question_text: "What is Nemo's dad called?",
    correct_answer: 'Marlin',
    wrong_answers: ['Gill', 'Crush', 'Dory'],
  },
  {
    category: 'Movies',
    question_text: 'Which Disney movie is set in New Orleans?',
    correct_answer: 'The Princess and the Frog',
    wrong_answers: ['Cinderella', 'Pocahontas', 'The Aristocats'],
  },
  {
    category: 'Movies',
    question_text: 'What year was Frozen released?',
    correct_answer: '2013',
    wrong_answers: ['2010', '2015', '2012'],
  },
  {
    category: 'Movies',
    question_text: 'Which Pixar movie is set inside the mind of a girl?',
    correct_answer: 'Inside Out',
    wrong_answers: ['Soul', 'Coco', 'Up'],
  },
  {
    category: 'Movies',
    question_text: 'In which movie does a house fly using balloons?',
    correct_answer: 'Up',
    wrong_answers: ['Inside Out', 'WALL-E', 'Toy Story'],
  },
  {
    category: 'Movies',
    question_text: 'Which Disney movie features a demigod named Maui?',
    correct_answer: 'Moana',
    wrong_answers: ['Hercules', 'Lilo & Stitch', 'Brave'],
  },
  {
    category: 'Movies',
    question_text: 'What is the first Pixar feature film?',
    correct_answer: 'Toy Story',
    wrong_answers: ["A Bug's Life", 'Monsters, Inc.', 'Finding Nemo'],
  },
  {
    category: 'Movies',
    question_text: 'Which movie takes place in the Land of the Dead?',
    correct_answer: 'Coco',
    wrong_answers: ['Soul', 'The Nightmare Before Christmas', 'Corpse Bride'],
  },
  {
    category: 'Movies',
    question_text: 'In which movie does a robot fall in love with another robot named EVE?',
    correct_answer: 'WALL-E',
    wrong_answers: ['Big Hero 6', 'Robots', 'Treasure Planet'],
  },
  {
    category: 'Movies',
    question_text: "What is the setting of Disney's Encanto?",
    correct_answer: 'Colombia',
    wrong_answers: ['Mexico', 'Brazil', 'Peru'],
  },
  {
    category: 'Movies',
    question_text: 'Which Disney movie features a princess who turns into a frog?',
    correct_answer: 'The Princess and the Frog',
    wrong_answers: ['Tangled', 'Brave', 'Enchanted'],
  },
  {
    category: 'Movies',
    question_text: 'What sport is featured in Cars?',
    correct_answer: 'Racing',
    wrong_answers: ['Soccer', 'Baseball', 'Wrestling'],
  },
  {
    category: 'Movies',
    question_text: 'Which movie features the city of Zootopia?',
    correct_answer: 'Zootopia',
    wrong_answers: ['The Wild', 'Madagascar', 'Sing'],
  },
  {
    category: 'Movies',
    question_text: 'In Monsters, Inc., what powers the city?',
    correct_answer: "Children's screams",
    wrong_answers: ['Electricity', 'Solar energy', 'Magic crystals'],
  },
  {
    category: 'Movies',
    question_text: 'Which movie features a superhero family?',
    correct_answer: 'The Incredibles',
    wrong_answers: ['Big Hero 6', 'Sky High', 'Bolt'],
  },
  {
    category: 'Movies',
    question_text: 'What Disney movie is set in the Scottish Highlands?',
    correct_answer: 'Brave',
    wrong_answers: ['Frozen', 'Tangled', 'Robin Hood'],
  },
  {
    category: 'Movies',
    question_text: "What is the name of the ocean world in Finding Nemo's dentist scene?",
    correct_answer: 'Sydney Harbour',
    wrong_answers: ['Great Barrier Reef', 'Pacific Ocean', 'Coral Bay'],
  },
  {
    category: 'Movies',
    question_text: 'Which movie features a game-hopping villain named Turbo?',
    correct_answer: 'Wreck-It Ralph',
    wrong_answers: ['Toy Story', 'Inside Out', 'Big Hero 6'],
  },
  {
    category: 'Movies',
    question_text: 'In Lilo & Stitch, what is Lilo\'s favorite phrase about family?',
    correct_answer: 'Ohana means family',
    wrong_answers: ['Aloha spirit', 'Island love', 'Together forever'],
  },
  {
    category: 'Movies',
    question_text: 'Which Disney movie features a wooden puppet who wants to be real?',
    correct_answer: 'Pinocchio',
    wrong_answers: ['Toy Story', 'The Nutcracker', 'Gepetto'],
  },
  {
    category: 'Movies',
    question_text: 'What year was The Lion King originally released?',
    correct_answer: '1994',
    wrong_answers: ['1992', '1996', '1998'],
  },
  // Songs
  {
    category: 'Songs',
    question_text: 'Which movie features "Let It Go"?',
    correct_answer: 'Frozen',
    wrong_answers: ['Tangled', 'Moana', 'Brave'],
  },
  {
    category: 'Songs',
    question_text: 'Who sings "Under the Sea"?',
    correct_answer: 'Sebastian',
    wrong_answers: ['Ariel', 'Flounder', 'Scuttle'],
  },
  {
    category: 'Songs',
    question_text: 'Which movie features "A Whole New World"?',
    correct_answer: 'Aladdin',
    wrong_answers: ['Cinderella', 'Sleeping Beauty', 'The Little Mermaid'],
  },
  {
    category: 'Songs',
    question_text: 'Complete the lyric: "Be our ___"',
    correct_answer: 'Guest',
    wrong_answers: ['Friend', 'Love', 'Light'],
  },
  {
    category: 'Songs',
    question_text: 'Which movie features "Circle of Life"?',
    correct_answer: 'The Lion King',
    wrong_answers: ['Bambi', 'The Jungle Book', 'Tarzan'],
  },
  {
    category: 'Songs',
    question_text: 'Who sings "Part of Your World"?',
    correct_answer: 'Ariel',
    wrong_answers: ['Belle', 'Jasmine', 'Cinderella'],
  },
  {
    category: 'Songs',
    question_text: 'Which movie features "You\'re Welcome"?',
    correct_answer: 'Moana',
    wrong_answers: ['Frozen', 'Tangled', 'Brave'],
  },
  {
    category: 'Songs',
    question_text: '"Colors of the Wind" is from which movie?',
    correct_answer: 'Pocahontas',
    wrong_answers: ['Mulan', 'Brave', 'Tangled'],
  },
  {
    category: 'Songs',
    question_text: 'Which movie features "I Just Can\'t Wait to Be King"?',
    correct_answer: 'The Lion King',
    wrong_answers: ['Aladdin', 'Robin Hood', 'Sleeping Beauty'],
  },
  {
    category: 'Songs',
    question_text: '"When You Wish Upon a Star" is from which movie?',
    correct_answer: 'Pinocchio',
    wrong_answers: ['Cinderella', 'Peter Pan', 'Sleeping Beauty'],
  },
  {
    category: 'Songs',
    question_text: 'Who sings "How Far I\'ll Go"?',
    correct_answer: 'Moana',
    wrong_answers: ['Elsa', 'Rapunzel', 'Ariel'],
  },
  {
    category: 'Songs',
    question_text: '"Supercalifragilisticexpialidocious" is from which movie?',
    correct_answer: 'Mary Poppins',
    wrong_answers: ['Cinderella', 'The Aristocats', 'Bedknobs and Broomsticks'],
  },
  {
    category: 'Songs',
    question_text: 'Which movie features "Friend Like Me"?',
    correct_answer: 'Aladdin',
    wrong_answers: ['Toy Story', 'The Jungle Book', 'Hercules'],
  },
  {
    category: 'Songs',
    question_text: '"I\'ll Make a Man Out of You" is from which movie?',
    correct_answer: 'Mulan',
    wrong_answers: ['Hercules', 'Brave', 'Tarzan'],
  },
  {
    category: 'Songs',
    question_text: 'Which movie features "Bare Necessities"?',
    correct_answer: 'The Jungle Book',
    wrong_answers: ['The Lion King', 'Tarzan', 'Brother Bear'],
  },
  {
    category: 'Songs',
    question_text: '"Do You Want to Build a Snowman?" is sung by whom?',
    correct_answer: 'Anna',
    wrong_answers: ['Elsa', 'Olaf', 'Kristoff'],
  },
  {
    category: 'Songs',
    question_text: 'Which movie features "Go the Distance"?',
    correct_answer: 'Hercules',
    wrong_answers: ['Mulan', 'Tarzan', 'Moana'],
  },
  {
    category: 'Songs',
    question_text: '"Bibbidi-Bobbidi-Boo" is from which movie?',
    correct_answer: 'Cinderella',
    wrong_answers: ['Sleeping Beauty', 'Snow White', 'The Sword in the Stone'],
  },
  {
    category: 'Songs',
    question_text: '"We Don\'t Talk About Bruno" is from which movie?',
    correct_answer: 'Encanto',
    wrong_answers: ['Coco', 'Moana', 'Luca'],
  },
  {
    category: 'Songs',
    question_text: '"You\'ve Got a Friend in Me" is from which movie?',
    correct_answer: 'Toy Story',
    wrong_answers: ['Monsters, Inc.', 'Finding Nemo', 'Up'],
  },
  {
    category: 'Songs',
    question_text: 'Who wrote the songs for The Lion King?',
    correct_answer: 'Elton John',
    wrong_answers: ['Phil Collins', 'Alan Menken', 'Lin-Manuel Miranda'],
  },
  {
    category: 'Songs',
    question_text: '"Strangers Like Me" is from which movie?',
    correct_answer: 'Tarzan',
    wrong_answers: ['The Jungle Book', 'Pocahontas', 'Lilo & Stitch'],
  },
  {
    category: 'Songs',
    question_text: '"Surface Pressure" is from which movie?',
    correct_answer: 'Encanto',
    wrong_answers: ['Turning Red', 'Luca', 'Frozen II'],
  },
  {
    category: 'Songs',
    question_text: '"Once Upon a Dream" is from which movie?',
    correct_answer: 'Sleeping Beauty',
    wrong_answers: ['Cinderella', 'Snow White', 'Tangled'],
  },
  {
    category: 'Songs',
    question_text: '"I See the Light" is from which movie?',
    correct_answer: 'Tangled',
    wrong_answers: ['Frozen', 'Moana', 'The Little Mermaid'],
  },
  {
    category: 'Songs',
    question_text: 'Who wrote the songs for Moana?',
    correct_answer: 'Lin-Manuel Miranda',
    wrong_answers: ['Alan Menken', 'Phil Collins', 'Randy Newman'],
  },
  {
    category: 'Songs',
    question_text: '"Remember Me" is from which Pixar movie?',
    correct_answer: 'Coco',
    wrong_answers: ['Up', 'Soul', 'Inside Out'],
  },
  // Villains
  {
    category: 'Villains',
    question_text: 'Who is the villain in The Little Mermaid?',
    correct_answer: 'Ursula',
    wrong_answers: ['Maleficent', 'Cruella', 'Evil Queen'],
  },
  {
    category: 'Villains',
    question_text: 'What is the name of the villain in 101 Dalmatians?',
    correct_answer: 'Cruella de Vil',
    wrong_answers: ['Lady Tremaine', 'Maleficent', 'Mother Gothel'],
  },
  {
    category: 'Villains',
    question_text: "Who is Scar's brother?",
    correct_answer: 'Mufasa',
    wrong_answers: ['Simba', 'Rafiki', 'Zazu'],
  },
  {
    category: 'Villains',
    question_text: "What is Captain Hook's first name?",
    correct_answer: 'James',
    wrong_answers: ['John', 'William', 'Edward'],
  },
  {
    category: 'Villains',
    question_text: 'Who is the villain in Sleeping Beauty?',
    correct_answer: 'Maleficent',
    wrong_answers: ['Ursula', 'Evil Queen', 'Cruella'],
  },
  {
    category: 'Villains',
    question_text: "What is Jafar's role in Agrabah?",
    correct_answer: 'Royal Vizier',
    wrong_answers: ['Sultan', 'Guard Captain', 'Sorcerer King'],
  },
  {
    category: 'Villains',
    question_text: "Who is Gaston's sidekick in Beauty and the Beast?",
    correct_answer: 'LeFou',
    wrong_answers: ['Iago', 'Pain', 'Smee'],
  },
  {
    category: 'Villains',
    question_text: 'Who cursed the Beast in Beauty and the Beast?',
    correct_answer: 'An enchantress',
    wrong_answers: ['Maleficent', 'The Evil Queen', 'Ursula'],
  },
  {
    category: 'Villains',
    question_text: "What is the Evil Queen's famous question to her mirror?",
    correct_answer: 'Who is the fairest of them all?',
    wrong_answers: [
      'Who is the most powerful?',
      'Who is the wisest in the land?',
      'Who shall rule them all?',
    ],
  },
  {
    category: 'Villains',
    question_text: 'Who is the villain in Tangled?',
    correct_answer: 'Mother Gothel',
    wrong_answers: ['Lady Tremaine', 'Maleficent', 'Ursula'],
  },
  {
    category: 'Villains',
    question_text: 'What is Hades the god of in Hercules?',
    correct_answer: 'The Underworld',
    wrong_answers: ['The Sea', 'The Sky', 'War'],
  },
  {
    category: 'Villains',
    question_text: 'Who is the villain in The Lion King II?',
    correct_answer: 'Zira',
    wrong_answers: ['Scar', 'Shenzi', 'Nuka'],
  },
  {
    category: 'Villains',
    question_text: "What is the name of the hunter in Bambi?",
    correct_answer: 'Man',
    wrong_answers: ['Gaston', 'Clayton', 'McLeach'],
  },
  {
    category: 'Villains',
    question_text: 'Who is the villain in Mulan?',
    correct_answer: 'Shan Yu',
    wrong_answers: ['Jafar', 'Hades', 'Dr. Facilier'],
  },
  {
    category: 'Villains',
    question_text: 'What does Ursula take from Ariel?',
    correct_answer: 'Her voice',
    wrong_answers: ['Her hair', 'Her tail', 'Her memory'],
  },
  {
    category: 'Villains',
    question_text: 'Who is the villain in Treasure Planet?',
    correct_answer: 'John Silver',
    wrong_answers: ['Captain Hook', 'Barbossa', 'Davy Jones'],
  },
  {
    category: 'Villains',
    question_text: 'What is the name of the villain in The Princess and the Frog?',
    correct_answer: 'Dr. Facilier',
    wrong_answers: ['Jafar', 'Hades', 'Shan Yu'],
  },
  {
    category: 'Villains',
    question_text: "Who is the villain in Monsters, Inc.?",
    correct_answer: 'Randall Boggs',
    wrong_answers: ['Waternoose', 'Fungus', 'Roz'],
  },
  {
    category: 'Villains',
    question_text: 'What does Gaston want from Belle?',
    correct_answer: 'To marry her',
    wrong_answers: ['Her library', 'Her cooking', 'Her father\'s inventions'],
  },
  {
    category: 'Villains',
    question_text: 'Who is the villain in Big Hero 6?',
    correct_answer: 'Yokai (Professor Callaghan)',
    wrong_answers: ['Alistair Krei', 'Baymax', 'Tadashi'],
  },
  {
    category: 'Villains',
    question_text: 'What does Syndrome want to do in The Incredibles?',
    correct_answer: 'Eliminate all superheroes',
    wrong_answers: ['Rule the world', 'Become invisible', 'Destroy the city'],
  },
  {
    category: 'Villains',
    question_text: 'Who is the hunter villain in Tarzan?',
    correct_answer: 'Clayton',
    wrong_answers: ['McLeach', 'Gaston', 'Amos Slade'],
  },
  {
    category: 'Villains',
    question_text: "What is Cruella de Vil's obsession?",
    correct_answer: 'Fur coats',
    wrong_answers: ['Jewelry', 'Shoes', 'Perfume'],
  },
  {
    category: 'Villains',
    question_text: 'Who is the villain in Wreck-It Ralph?',
    correct_answer: 'King Candy (Turbo)',
    wrong_answers: ['Ralph', 'Sergeant Calhoun', 'Vanellope'],
  },
  {
    category: 'Villains',
    question_text: "What is the name of Jafar's parrot?",
    correct_answer: 'Iago',
    wrong_answers: ['Zazu', 'Diablo', 'Scuttle'],
  },
  {
    category: 'Villains',
    question_text: 'Who is the villain in Pocahontas?',
    correct_answer: 'Governor Ratcliffe',
    wrong_answers: ['John Smith', 'Captain Hook', 'Clayton'],
  },
  {
    category: 'Villains',
    question_text: "What does Maleficent's curse do to Aurora?",
    correct_answer: 'Puts her into an eternal sleep',
    wrong_answers: ['Turns her into a frog', 'Takes her voice', 'Traps her in a tower'],
  },
  {
    category: 'Villains',
    question_text: 'Who is the main antagonist in Encanto?',
    correct_answer: 'There is no traditional villain',
    wrong_answers: ['Bruno', 'Abuela', 'The townspeople'],
  },
  {
    category: 'Villains',
    question_text: 'What creature does Maleficent turn into in Sleeping Beauty?',
    correct_answer: 'A dragon',
    wrong_answers: ['A snake', 'A wolf', 'A raven'],
  },
]

export async function seedData(db: PGliteWithLive) {
  // Check if already seeded
  const existing = await db.query<{ count: number }>(
    'SELECT COUNT(*)::int as count FROM categories',
  )
  if (existing.rows[0].count > 0) return

  // Insert categories
  for (const name of categories) {
    await db.query('INSERT INTO categories (name) VALUES ($1)', [name])
  }

  // Fetch category IDs
  const catRows = await db.query<{ id: number; name: string }>(
    'SELECT id, name FROM categories',
  )
  const catMap = new Map(catRows.rows.map((r) => [r.name, r.id]))

  // Bulk insert questions
  for (const q of questions) {
    const categoryId = catMap.get(q.category)
    await db.query(
      `INSERT INTO questions (category_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        categoryId,
        q.question_text,
        q.correct_answer,
        q.wrong_answers[0],
        q.wrong_answers[1],
        q.wrong_answers[2],
      ],
    )
  }
}
