export interface RevisionFlashcard {
  term: string;
  definition: string;
  hint: string;
}

export interface RevisionQuestion {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty: number;
}

interface ExtensionSeed {
  summary: string;
  examTip: string;
  cards: RevisionFlashcard[];
}

const seeds: Record<string, ExtensionSeed> = {
  "natural-hazards": {
    summary: "Natural hazards become disasters when they affect vulnerable people. Risk depends on the type and magnitude of the event, exposure, vulnerability and capacity to cope.",
    examTip: "When explaining hazard risk, link the physical event to human vulnerability rather than describing the event alone.",
    cards: [
      { term: "Natural hazard", definition: "A natural event that threatens people, property or the environment.", hint: "A threat, not automatically a disaster." },
      { term: "Hazard risk", definition: "The probability that people will be affected by a natural hazard.", hint: "Likelihood plus consequences." },
      { term: "Vulnerability", definition: "How susceptible people are to harm because of factors such as poverty, weak buildings or limited preparation.", hint: "How easily people can be harmed." },
      { term: "Magnitude", definition: "The size or strength of a hazardous event.", hint: "How powerful is it?" },
      { term: "Primary effect", definition: "An immediate impact caused directly by the hazard, such as collapsed buildings.", hint: "Direct and immediate." },
      { term: "Secondary effect", definition: "An impact caused by the primary effects, such as disease after water supplies are damaged.", hint: "A consequence of a consequence." },
    ],
  },
  "tectonic-hazards": {
    summary: "Earthquakes and volcanoes are concentrated at plate margins. Their effects vary with magnitude, population density, development, building quality and preparedness.",
    examTip: "For a named event, learn precise primary effects, secondary effects, immediate responses and long-term responses.",
    cards: [
      { term: "Constructive margin", definition: "A plate boundary where plates move apart and magma rises to form new crust.", hint: "Plates construct new land." },
      { term: "Destructive margin", definition: "A boundary where a denser oceanic plate is forced beneath another plate and melts.", hint: "Crust is destroyed by subduction." },
      { term: "Conservative margin", definition: "A boundary where plates slide past each other; pressure builds and is released as earthquakes.", hint: "No crust made or destroyed." },
      { term: "Focus", definition: "The point inside the Earth where an earthquake begins.", hint: "Underground origin." },
      { term: "Epicentre", definition: "The point on the Earth's surface directly above the focus.", hint: "Surface point above the origin." },
      { term: "Monitoring", definition: "Using instruments and observations to detect signs of a possible hazard, such as small tremors or gas emissions.", hint: "Measure warning signs." },
    ],
  },
  "weather-hazards-climate-change": {
    summary: "Global atmospheric circulation redistributes heat and helps create distinct climate zones. Tropical storms need warm oceans, rising moist air and sufficient Coriolis force.",
    examTip: "Use a clear sequence for storm formation and distinguish evidence for climate change from its natural and human causes.",
    cards: [
      { term: "Global atmospheric circulation", definition: "The worldwide movement of air that transfers heat from the equator towards the poles.", hint: "A global heat-transfer system." },
      { term: "Tropical storm", definition: "A rotating low-pressure weather system with very strong winds and heavy rain that forms over warm tropical oceans.", hint: "Warm ocean, low pressure, rotation." },
      { term: "Coriolis effect", definition: "The apparent deflection of moving air caused by the Earth's rotation.", hint: "Makes storms spin." },
      { term: "Mitigation", definition: "Action that reduces the causes of climate change, such as using renewable energy.", hint: "Tackle the cause." },
      { term: "Adaptation", definition: "Action that adjusts to the effects of climate change, such as building flood defences.", hint: "Cope with the effect." },
      { term: "Enhanced greenhouse effect", definition: "Extra warming caused by rising concentrations of greenhouse gases from human activity.", hint: "Humans strengthen a natural process." },
    ],
  },
  "ecosystems-rainforests": {
    summary: "Ecosystems link living and non-living components through nutrient cycles and food webs. Tropical rainforests are highly biodiverse but their nutrient stores are easily disrupted.",
    examTip: "Explain rainforest characteristics as linked adaptations: climate affects soils, vegetation, nutrient cycling and biodiversity.",
    cards: [
      { term: "Ecosystem", definition: "A community of living organisms interacting with each other and with the non-living environment.", hint: "Biotic plus abiotic interactions." },
      { term: "Producer", definition: "An organism, usually a green plant, that makes its own food through photosynthesis.", hint: "Starts a food chain." },
      { term: "Biodiversity", definition: "The variety of living organisms in an area.", hint: "Variety of life." },
      { term: "Nutrient cycle", definition: "The movement and exchange of nutrients between biomass, litter and soil.", hint: "Nutrients move between three stores." },
      { term: "Deforestation", definition: "The large-scale removal of forest, often for farming, logging, mining or infrastructure.", hint: "Forest clearance." },
      { term: "Sustainable management", definition: "Using a resource at a rate and in a way that meets present needs without preventing future use.", hint: "Use without long-term loss." },
    ],
  },
  "uk-landscapes": {
    summary: "UK landscapes are shaped by geology, climate and geomorphic processes. Rivers and coasts change through weathering, mass movement, erosion, transport and deposition.",
    examTip: "For any landform, name the processes and explain them in the correct order; annotated diagrams can strengthen the sequence.",
    cards: [
      { term: "Hydraulic action", definition: "Erosion caused when the force of water and compressed air break material from a river bank or cliff.", hint: "The force of water." },
      { term: "Abrasion", definition: "Erosion caused when rocks carried by water scrape and wear away the channel or cliff.", hint: "The load acts like sandpaper." },
      { term: "Longshore drift", definition: "The movement of sediment along a coast as angled swash and straight backwash create a zigzag path.", hint: "Sediment zigzags along the beach." },
      { term: "Deposition", definition: "The dropping of transported material when water loses energy.", hint: "Less energy means load is dropped." },
      { term: "Hard engineering", definition: "Managing erosion or flooding with artificial structures such as sea walls, dams or groynes.", hint: "Built structures." },
      { term: "Soft engineering", definition: "Managing natural processes with approaches such as beach nourishment, flood warnings or managed retreat.", hint: "Work with natural systems." },
    ],
  },
  "urban-issues": {
    summary: "Urban growth creates opportunities and challenges. Sustainable urban planning aims to improve housing, transport, services and environmental quality without shifting problems elsewhere.",
    examTip: "Use place-specific evidence and organise effects into social, economic and environmental categories.",
    cards: [
      { term: "Urbanisation", definition: "An increase in the proportion of a country's population living in towns and cities.", hint: "A growing urban share." },
      { term: "Natural increase", definition: "Population growth when the birth rate is higher than the death rate.", hint: "Births minus deaths." },
      { term: "Rural–urban migration", definition: "The movement of people from the countryside to towns and cities.", hint: "Countryside to city." },
      { term: "Megacity", definition: "An urban area with a population of more than 10 million people.", hint: "The 10 million threshold." },
      { term: "Urban regeneration", definition: "Long-term investment intended to reverse decline and improve an urban area.", hint: "Renew a declining area." },
      { term: "Sustainable urban living", definition: "Meeting residents' needs while reducing resource use, pollution and harm to future generations.", hint: "A liveable city with a lower impact." },
    ],
  },
  "changing-economic-world": {
    summary: "Development is uneven and measured in several ways. Economic change affects quality of life, employment structure, trade relationships and regional inequality.",
    examTip: "Avoid relying on one development indicator; compare economic and social measures and explain why the development gap exists.",
    cards: [
      { term: "Development", definition: "Improvement in people's quality of life and standard of living.", hint: "More than economic growth alone." },
      { term: "GNI per head", definition: "The total income earned by a country's people and businesses divided by its population.", hint: "Average national income." },
      { term: "Human Development Index", definition: "A composite measure combining life expectancy, education and income.", hint: "Health, education and income." },
      { term: "Development gap", definition: "The difference in wealth and quality of life between richer and poorer places.", hint: "Uneven development." },
      { term: "TNC", definition: "A transnational corporation that operates in more than one country.", hint: "A company across borders." },
      { term: "Post-industrial economy", definition: "An economy in which services, information and research are more important than manufacturing.", hint: "A shift beyond heavy industry." },
    ],
  },
  "resource-management": {
    summary: "Food, water and energy are essential resources whose supply and demand vary spatially. Management choices create economic, social and environmental trade-offs.",
    examTip: "Evaluate strategies with a consistent frame: cost, scale, reliability, environmental impact and who gains or loses.",
    cards: [
      { term: "Resource security", definition: "Reliable access to enough affordable food, water or energy.", hint: "Dependable access." },
      { term: "Resource insecurity", definition: "Insufficient or unreliable access to a resource needed for wellbeing and development.", hint: "Supply cannot reliably meet need." },
      { term: "Water stress", definition: "A situation where demand for water is close to or greater than the available supply.", hint: "Demand pressures supply." },
      { term: "Energy mix", definition: "The combination of different energy sources used by a place.", hint: "The blend of energy sources." },
      { term: "Renewable resource", definition: "A resource replenished naturally at or near the rate it is used.", hint: "Naturally replaced." },
      { term: "Carbon footprint", definition: "The total greenhouse gas emissions caused directly and indirectly by an activity, product or person.", hint: "The emissions total." },
    ],
  },
  "germany-kaiser-weimar": {
    summary: "Germany changed from an authoritarian empire to a democratic republic after defeat in 1918. Weimar democracy survived major political and economic crises but remained vulnerable.",
    examTip: "Build causal chains: identify the factor, show how it created pressure, then explain why that pressure mattered politically.",
    cards: [
      { term: "Kaiser", definition: "The German emperor; Wilhelm II ruled an authoritarian Germany until his abdication in 1918.", hint: "Germany's emperor." },
      { term: "Reichstag", definition: "The elected German parliament, whose power was limited under the Kaiser but expanded under Weimar.", hint: "The German parliament." },
      { term: "Weimar Constitution", definition: "The democratic system introduced in 1919 with proportional representation and extensive civil rights.", hint: "Germany's new democratic rules." },
      { term: "Article 48", definition: "A constitutional power allowing the president to rule by emergency decree in a crisis.", hint: "Emergency presidential power." },
      { term: "Hyperinflation", definition: "A rapid collapse in the value of money, severe in Germany in 1923 after the government printed money to meet costs.", hint: "Prices rise as money becomes nearly worthless." },
      { term: "Stresemann", definition: "The politician associated with currency reform, improved foreign relations and greater stability from 1923.", hint: "Recovery and diplomacy." },
    ],
  },
  "nazi-rise": {
    summary: "The Nazi rise combined Hitler's leadership and propaganda with economic crisis, conservative miscalculation, fear of communism and weaknesses in Weimar government.",
    examTip: "Do not write that one factor alone brought Hitler to power; compare long-term weaknesses, the Depression and political decisions in 1932–33.",
    cards: [
      { term: "Munich Putsch", definition: "Hitler's failed attempt to seize power in Bavaria in 1923, after which he changed to a legal strategy.", hint: "A failed coup changed Nazi tactics." },
      { term: "Mein Kampf", definition: "Hitler's book outlining ideas including extreme nationalism, antisemitism and Lebensraum.", hint: "Hitler's ideology in print." },
      { term: "Wall Street Crash", definition: "The 1929 financial collapse that helped trigger depression and mass unemployment in Germany.", hint: "Economic crisis after 1929." },
      { term: "Propaganda", definition: "Information designed to shape opinion; Nazis used posters, speeches, rallies and simple repeated messages.", hint: "Persuasion serving a political aim." },
      { term: "SA", definition: "The Nazi paramilitary organisation that protected meetings and intimidated political opponents.", hint: "Brownshirt street force." },
      { term: "Chancellor", definition: "Head of the German government; President Hindenburg appointed Hitler chancellor on 30 January 1933.", hint: "The office Hitler gained in 1933." },
    ],
  },
  "nazi-control-life": {
    summary: "The Nazis created a dictatorship through law, terror, censorship and propaganda, while reshaping youth, education, work and family life around their racial and political aims.",
    examTip: "Separate control from consent: explain both coercion and the reasons some Germans supported or accommodated the regime.",
    cards: [
      { term: "Enabling Act", definition: "The March 1933 law that allowed Hitler's government to make laws without the Reichstag for four years.", hint: "Legal foundation of dictatorship." },
      { term: "Night of the Long Knives", definition: "The 1934 purge in which the SS killed SA leaders and other opponents, securing army support.", hint: "A violent purge in 1934." },
      { term: "Gestapo", definition: "The secret state police that investigated and arrested opponents of the Nazi regime.", hint: "Secret police." },
      { term: "SS", definition: "An elite Nazi organisation led by Himmler that controlled policing, concentration camps and racial policy.", hint: "Himmler's powerful organisation." },
      { term: "Nuremberg Laws", definition: "The 1935 laws that removed German citizenship from Jewish people and banned marriage with non-Jews.", hint: "Racist laws of 1935." },
      { term: "Hitler Youth", definition: "Nazi youth organisations that promoted physical training, military values and Nazi ideology.", hint: "Nazification of young people." },
    ],
  },
  "conflict-peacemaking": {
    summary: "The Paris Peace Conference produced several treaties after the First World War. The Treaty of Versailles reflected competing aims and created lasting controversy.",
    examTip: "Link each leader's aims to domestic pressures and explain why compromise produced a settlement no leader considered perfect.",
    cards: [
      { term: "Paris Peace Conference", definition: "The 1919 meeting at which the victorious powers negotiated peace settlements after the First World War.", hint: "The post-war negotiations." },
      { term: "Fourteen Points", definition: "Wilson's principles for a fair peace, including self-determination and a League of Nations.", hint: "Wilson's peace programme." },
      { term: "Reparations", definition: "Payments demanded from Germany for damage caused during the war.", hint: "Financial compensation." },
      { term: "War Guilt Clause", definition: "Article 231 of Versailles, which made Germany accept responsibility for war damage as a basis for reparations.", hint: "Article 231." },
      { term: "Self-determination", definition: "The principle that national groups should be able to choose their own government.", hint: "Nations choosing their political future." },
      { term: "Diktat", definition: "The German description of Versailles as a dictated peace that Germany had not been allowed to negotiate.", hint: "A dictated settlement." },
    ],
  },
  "conflict-league": {
    summary: "The League of Nations aimed to preserve peace through collective security, arbitration and sanctions, but its authority depended on member cooperation.",
    examTip: "For each crisis, judge the League against what it could realistically do and show how major-power self-interest shaped the outcome.",
    cards: [
      { term: "Collective security", definition: "The principle that states act together against an aggressor to protect every member.", hint: "An attack on one concerns all." },
      { term: "Assembly", definition: "The League body containing all member states, where decisions generally required unanimity.", hint: "All members met here." },
      { term: "Council", definition: "The smaller League body that met more often to address disputes and crises.", hint: "The League's smaller decision-making group." },
      { term: "Economic sanctions", definition: "Trade and financial restrictions intended to pressure an aggressor without military force.", hint: "Economic punishment." },
      { term: "Manchurian Crisis", definition: "The 1931–33 crisis in which Japan occupied Manchuria and left the League after criticism.", hint: "Japan tested the League." },
      { term: "Abyssinian Crisis", definition: "The 1935–36 crisis in which Italy conquered Abyssinia despite incomplete League sanctions.", hint: "Mussolini exposed League weakness." },
    ],
  },
  "conflict-origins-war": {
    summary: "The Second World War resulted from the breakdown of collective security, aggressive expansion by dictatorships, the legacy of Versailles and failed responses by other powers.",
    examTip: "Distinguish Hitler's aims from the opportunities created by appeasement, international weakness and the Nazi–Soviet Pact.",
    cards: [
      { term: "Appeasement", definition: "The policy of making concessions to aggressive powers in the hope of avoiding a larger war.", hint: "Concessions for peace." },
      { term: "Remilitarisation of the Rhineland", definition: "Hitler's 1936 decision to send German troops into the demilitarised Rhineland, breaking Versailles and Locarno.", hint: "A calculated challenge in 1936." },
      { term: "Anschluss", definition: "The union of Germany and Austria achieved by Hitler in March 1938.", hint: "Germany joined with Austria." },
      { term: "Munich Agreement", definition: "The September 1938 agreement allowing Germany to take the Sudetenland from Czechoslovakia.", hint: "The high point of appeasement." },
      { term: "Nazi–Soviet Pact", definition: "The August 1939 non-aggression agreement whose secret terms divided influence in eastern Europe.", hint: "Hitler and Stalin's temporary deal." },
      { term: "Invasion of Poland", definition: "Germany's attack on Poland on 1 September 1939, leading Britain and France to declare war.", hint: "The immediate trigger for war in Europe." },
    ],
  },
  "health-people": {
    summary: "Health and medicine changed through scientific discovery, technology, government action, war, communication and individual work, although progress was uneven.",
    examTip: "Across periods, compare the rate and scale of change and weigh factors rather than listing discoveries chronologically.",
    cards: [
      { term: "Four Humours", definition: "The ancient theory that illness resulted from an imbalance of blood, phlegm, black bile and yellow bile.", hint: "An influential incorrect theory." },
      { term: "Germ theory", definition: "Pasteur's explanation that microorganisms cause decay and disease, developed in the nineteenth century.", hint: "Microbes cause disease." },
      { term: "Vaccination", definition: "Using a safe form or component of a pathogen to stimulate immunity against disease.", hint: "Prevention by training the immune system." },
      { term: "Antiseptic surgery", definition: "Lister's use of carbolic acid to kill microbes and reduce infection during surgery.", hint: "Lister tackled surgical infection." },
      { term: "Public Health Act 1875", definition: "A law requiring local authorities to improve sanitation, water supply and public health provision.", hint: "Government made local action compulsory." },
      { term: "NHS", definition: "The National Health Service, created in 1948 to provide healthcare funded through taxation and free at the point of use.", hint: "Healthcare access after 1948." },
    ],
  },
  "elizabethan-england": {
    summary: "Elizabeth I's reign combined political stability and cultural confidence with religious division, poverty, plots, war with Spain and expanding exploration.",
    examTip: "Use contextual knowledge to evaluate interpretations, and connect events at a historic site to the wider political and religious setting.",
    cards: [
      { term: "Religious Settlement", definition: "The 1559 laws establishing a Protestant Church of England while retaining some traditional forms.", hint: "Elizabeth's religious compromise." },
      { term: "Privy Council", definition: "Elizabeth's small group of leading advisers who helped govern and implement royal policy.", hint: "The queen's key advisers." },
      { term: "Mary, Queen of Scots", definition: "Elizabeth's Catholic cousin and a focus for plots, imprisoned in England and executed in 1587.", hint: "A dynastic and religious threat." },
      { term: "Northern Rebellion", definition: "The 1569 Catholic uprising by northern earls that aimed to restore Catholic influence and free Mary.", hint: "A major Catholic revolt." },
      { term: "Spanish Armada", definition: "Philip II's 1588 fleet intended to support an invasion of England; it was defeated and dispersed.", hint: "The failed invasion fleet." },
      { term: "Poor Laws", definition: "Measures that distinguished between types of poor people and made local parishes responsible for relief.", hint: "Local government response to poverty." },
    ],
  },
};

function makeQuestions(cards: RevisionFlashcard[]): RevisionQuestion[] {
  return cards.slice(0, 5).map((card, index) => {
    const distractors = [1, 2, 3].map((offset) => cards[(index + offset) % cards.length].definition);
    const correctIndex = index % 4;
    const options = [...distractors];
    options.splice(correctIndex, 0, card.definition);
    return {
      question: `Which description best matches “${card.term}”?`,
      options,
      correct_answer: correctIndex,
      explanation: `${card.term}: ${card.definition}`,
      difficulty: index < 2 ? 1 : 2,
    };
  });
}

export const extendedRevisionContent = Object.fromEntries(
  Object.entries(seeds).map(([slug, seed]) => [
    slug,
    {
      summary: seed.summary,
      examTip: seed.examTip,
      flashcards: seed.cards,
      questions: makeQuestions(seed.cards),
    },
  ])
);
