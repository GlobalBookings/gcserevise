import type { RevisionFlashcard, RevisionQuestion } from "./revision-extensions";

type TopicSeed = {
  paper: string;
  name: string;
  slug: string;
  specRef: string;
  difficulty: number;
  summary: string;
  examTip: string;
  cards: Array<[term: string, definition: string]>;
};

function questions(cards: RevisionFlashcard[]): RevisionQuestion[] {
  return cards.slice(0, 5).map((card, index) => {
    const correctAnswer = index % 4;
    const distractors = [1, 2, 3].map((offset) => cards[(index + offset) % cards.length].definition);
    const options = [...distractors];
    options.splice(correctAnswer, 0, card.definition);
    return {
      question: `Which explanation best matches “${card.term}”?`,
      options,
      correct_answer: correctAnswer,
      explanation: `${card.term}: ${card.definition}`,
      difficulty: index < 2 ? 1 : 2,
    };
  });
}

const religiousStudiesTopics: TopicSeed[] = [
  {
    paper: "Component 1",
    name: "Christian Beliefs and Teachings",
    slug: "christian-beliefs",
    specRef: "3.1.1",
    difficulty: 2,
    summary: "Christian beliefs centre on the nature of God, creation, incarnation, crucifixion, resurrection, salvation and life after death. Answers should show how beliefs connect to worship and moral action.",
    examTip: "Use an accurate teaching or scriptural reference, explain its meaning and link it directly to the belief in the question.",
    cards: [
      ["Trinity", "The belief that one God exists as Father, Son and Holy Spirit."],
      ["Incarnation", "The Christian belief that God became human in Jesus."],
      ["Atonement", "The restoration of the relationship between humanity and God through Jesus' death."],
      ["Resurrection", "The belief that Jesus rose from the dead, showing victory over sin and death."],
      ["Salvation", "Being saved from sin and its consequences through grace, faith and Jesus' work."],
      ["Eschatology", "Beliefs about death, judgement, heaven, hell and the final destiny of humanity."],
    ],
  },
  {
    paper: "Component 1",
    name: "Christian Practices",
    slug: "christian-practices",
    specRef: "3.1.2",
    difficulty: 2,
    summary: "Christian practices express belief through worship, prayer, sacraments, pilgrimage, festivals, mission, charity and responses to persecution and poverty.",
    examTip: "Explain why a practice matters, not only what happens. Different Christian traditions may express the same belief differently.",
    cards: [
      ["Sacrament", "A rite understood as an outward sign of inward spiritual grace."],
      ["Baptism", "A rite using water to mark entry into Christian life and cleansing from sin."],
      ["Eucharist", "A service remembering Jesus' Last Supper through bread and wine."],
      ["Pilgrimage", "A journey to a place of religious significance for worship or spiritual growth."],
      ["Mission", "Sharing Christian faith through words, service and example."],
      ["Reconciliation", "Restoring relationships after conflict, reflecting forgiveness and peace."],
    ],
  },
  {
    paper: "Component 1",
    name: "Islamic Beliefs and Teachings",
    slug: "islamic-beliefs",
    specRef: "3.2.1",
    difficulty: 2,
    summary: "Islamic beliefs include the oneness of Allah, prophethood, angels, holy books, judgement, divine will and the authority of the Qur'an and Sunnah.",
    examTip: "Distinguish shared Muslim beliefs from Sunni and Shi'a emphases where the specification requires it.",
    cards: [
      ["Tawhid", "The absolute oneness and uniqueness of Allah."],
      ["Risalah", "The belief that Allah communicates guidance through prophets."],
      ["Akhirah", "Life after death, including judgement and final destiny."],
      ["Predestination", "The belief that Allah knows and has authority over all that happens while humans remain accountable."],
      ["Imamate", "In Shi'a Islam, the divinely guided leadership of the Imams."],
      ["Qur'an", "Islam's holy book, believed to be Allah's final revelation to Muhammad."],
    ],
  },
  {
    paper: "Component 1",
    name: "Islamic Practices",
    slug: "islamic-practices",
    specRef: "3.2.2",
    difficulty: 2,
    summary: "Islamic practices structure worship and community through the Five Pillars, Ten Obligatory Acts, festivals, jihad and duties towards others.",
    examTip: "Connect each practice to the belief it expresses, such as submission, equality, discipline, gratitude or concern for the ummah.",
    cards: [
      ["Shahadah", "The declaration that there is no god but Allah and Muhammad is his messenger."],
      ["Salah", "The duty of regular prayer performed facing Makkah."],
      ["Zakah", "A required contribution from wealth to help people in need and support the Muslim community."],
      ["Sawm", "Fasting during Ramadan from dawn to sunset for those able to do so."],
      ["Hajj", "Pilgrimage to Makkah, required once for Muslims who are physically and financially able."],
      ["Jihad", "Striving in the way of Allah, including the inner struggle to live faithfully."],
    ],
  },
  {
    paper: "Component 2",
    name: "Relationships and Families",
    slug: "relationships-families",
    specRef: "3.2.1 Theme A",
    difficulty: 3,
    summary: "This theme considers human sexuality, marriage, divorce, contraception, family roles and gender equality through religious and non-religious perspectives.",
    examTip: "For evaluation, compare reasons and authority behind views rather than labelling a whole religion with one position.",
    cards: [
      ["Marriage", "A legally and often religiously recognised committed relationship."],
      ["Cohabitation", "Living together in an intimate relationship without being married."],
      ["Contraception", "Methods intended to prevent pregnancy."],
      ["Divorce", "The legal ending of a marriage."],
      ["Nuclear family", "A family unit made up of parents and their dependent children."],
      ["Gender equality", "The principle that people of all genders should have equal worth, rights and opportunity."],
    ],
  },
  {
    paper: "Component 2",
    name: "Religion, Peace and Conflict",
    slug: "peace-conflict",
    specRef: "3.2.2 Theme D",
    difficulty: 3,
    summary: "Peace and conflict explores justice, forgiveness, protest, terrorism, war, weapons of mass destruction and religious responses to violence.",
    examTip: "Apply the conditions of just war or pacifist reasoning precisely to the situation in the question.",
    cards: [
      ["Pacifism", "The belief that violence and war are wrong and disputes should be settled peacefully."],
      ["Just war", "A tradition setting conditions for when entering and fighting a war may be morally justified."],
      ["Terrorism", "The unlawful use of violence and fear, often against civilians, to pursue an aim."],
      ["Reconciliation", "Rebuilding a peaceful relationship after conflict."],
      ["Justice", "Fair treatment and the protection of rights, often including accountability for wrongdoing."],
      ["Weapons of mass destruction", "Weapons capable of causing death and destruction on a very large scale."],
    ],
  },
  {
    paper: "Component 2",
    name: "Religion, Crime and Punishment",
    slug: "crime-punishment",
    specRef: "3.2.2 Theme E",
    difficulty: 3,
    summary: "Crime and punishment considers causes of crime, aims of punishment, treatment of offenders, forgiveness, suffering and the death penalty.",
    examTip: "Separate the aims of punishment—retribution, deterrence, protection and reformation—before judging which matters most.",
    cards: [
      ["Retribution", "Punishment intended to make an offender pay for wrongdoing."],
      ["Deterrence", "Punishment intended to discourage the offender or others from committing crime."],
      ["Reformation", "Helping an offender change so they can live without committing further crime."],
      ["Protection", "Keeping society safe by restricting an offender's ability to cause harm."],
      ["Forgiveness", "Letting go of resentment or the desire for revenge while not necessarily removing justice."],
      ["Death penalty", "Execution by the state as punishment for a crime."],
    ],
  },
  {
    paper: "Component 2",
    name: "Human Rights and Social Justice",
    slug: "human-rights-social-justice",
    specRef: "3.2.2 Theme F",
    difficulty: 3,
    summary: "The theme examines human rights, prejudice, discrimination, wealth, poverty and religious responsibilities towards people who are vulnerable or excluded.",
    examTip: "Support an evaluation with a principle, a religious teaching and a practical consequence for individuals or society.",
    cards: [
      ["Human rights", "Basic freedoms and protections understood to belong to every person."],
      ["Prejudice", "An unfair pre-judgement about a person or group."],
      ["Discrimination", "Unfair treatment based on characteristics or group membership."],
      ["Social justice", "Working for fair opportunities, rights and distribution of resources in society."],
      ["Relative poverty", "Having much less income or resources than is normal in a society."],
      ["Stewardship", "The belief that humans have a responsibility to care for what has been entrusted to them."],
    ],
  },
];

const computerScienceTopics: TopicSeed[] = [
  {
    paper: "Paper 1",
    name: "Algorithms and Computational Thinking",
    slug: "algorithms-computational-thinking",
    specRef: "3.1",
    difficulty: 3,
    summary: "Algorithms solve problems through precise, finite steps. Learn decomposition, abstraction, searching, sorting, trace tables and how to compare efficiency.",
    examTip: "Trace the exact algorithm given before relying on memory. Show every changed variable and output in the table.",
    cards: [
      ["Algorithm", "A finite sequence of unambiguous steps that solves a problem."],
      ["Decomposition", "Breaking a complex problem into smaller manageable parts."],
      ["Abstraction", "Removing unnecessary detail so the important features are easier to work with."],
      ["Binary search", "A search of sorted data that repeatedly halves the remaining search area."],
      ["Merge sort", "A divide-and-conquer sort that splits data, sorts parts and merges them."],
      ["Trace table", "A table used to record variable values and outputs as an algorithm executes."],
    ],
  },
  {
    paper: "Paper 1",
    name: "Programming Fundamentals",
    slug: "programming-fundamentals",
    specRef: "3.2",
    difficulty: 3,
    summary: "Programming combines sequence, selection, iteration, data types, variables, operators, subroutines, arrays, validation and testing.",
    examTip: "Use indentation and meaningful identifiers. Test normal, boundary and invalid inputs rather than repeating the same kind of case.",
    cards: [
      ["Sequence", "Instructions executed one after another in order."],
      ["Selection", "Choosing which instructions execute based on a condition."],
      ["Iteration", "Repeating instructions using a count or condition."],
      ["Subroutine", "A named reusable block of code that performs a task."],
      ["Validation", "Checking that input is sensible and follows defined rules."],
      ["Boundary test", "A test using values at and immediately around the limit of valid input."],
    ],
  },
  {
    paper: "Paper 2",
    name: "Data Representation",
    slug: "data-representation",
    specRef: "3.3",
    difficulty: 3,
    summary: "Computers represent every data type in binary. Revise number conversion, character encoding, bitmap images, digital sound, compression and storage units.",
    examTip: "Write place values above binary digits and show conversions. For files, multiply dimensions, colour depth or sample data before converting units.",
    cards: [
      ["Bit", "A binary digit with the value 0 or 1."],
      ["Character set", "A defined mapping between characters and binary codes, such as ASCII or Unicode."],
      ["Colour depth", "The number of bits used for each pixel, controlling available colours."],
      ["Sample rate", "The number of sound measurements captured per second."],
      ["Lossless compression", "Reducing file size without discarding data, allowing exact reconstruction."],
      ["Lossy compression", "Reducing file size by permanently removing data judged less important."],
    ],
  },
  {
    paper: "Paper 2",
    name: "Computer Systems",
    slug: "computer-systems",
    specRef: "3.4",
    difficulty: 3,
    summary: "Computer systems depend on CPU components, the fetch-decode-execute cycle, memory, storage, embedded systems and operating-system services.",
    examTip: "Distinguish RAM, cache and secondary storage by purpose, volatility, capacity and speed.",
    cards: [
      ["CPU", "The processor that executes instructions and coordinates computer operations."],
      ["Control unit", "The CPU component that manages instruction execution and signals other components."],
      ["ALU", "The CPU component that performs arithmetic and logical operations."],
      ["Cache", "Small, fast memory near or inside the CPU that stores frequently used data and instructions."],
      ["Virtual memory", "Secondary storage used temporarily when there is insufficient RAM."],
      ["Embedded system", "A computer built into a larger device to perform a specific function."],
    ],
  },
  {
    paper: "Paper 2",
    name: "Networks and Protocols",
    slug: "networks-protocols",
    specRef: "3.5",
    difficulty: 3,
    summary: "Networks share data and resources through hardware, addressing, protocols, topologies, layers, wired or wireless transmission and client-server or peer-to-peer models.",
    examTip: "Name the protocol and its job. Do not say that every protocol simply 'sends data'.",
    cards: [
      ["Protocol", "An agreed set of rules for communication between devices."],
      ["IP address", "A numerical address used to identify a device on an IP network."],
      ["MAC address", "A hardware identifier associated with a network interface."],
      ["DNS", "A system that translates domain names into IP addresses."],
      ["Router", "A device that forwards packets between different networks."],
      ["Packet switching", "Splitting data into addressed packets that may travel by different routes and are reassembled."],
    ],
  },
  {
    paper: "Paper 2",
    name: "Cyber Security",
    slug: "cyber-security",
    specRef: "3.6",
    difficulty: 2,
    summary: "Cyber security protects confidentiality, integrity and availability against malware, social engineering, unauthorised access and network attacks.",
    examTip: "Match each defence to the named threat and explain how it reduces the risk; avoid generic lists.",
    cards: [
      ["Malware", "Malicious software designed to damage, disrupt, spy on or gain unauthorised access."],
      ["Phishing", "A social-engineering attack that impersonates a trusted source to steal information."],
      ["Brute-force attack", "Trying many possible credentials until the correct one is found."],
      ["Firewall", "Hardware or software that filters network traffic using security rules."],
      ["Encryption", "Transforming data with a key so unauthorised users cannot understand it."],
      ["Penetration testing", "Authorised attempts to find and report security weaknesses."],
    ],
  },
  {
    paper: "Paper 2",
    name: "Databases and SQL",
    slug: "databases-sql",
    specRef: "3.7",
    difficulty: 3,
    summary: "Relational databases organise structured data into linked tables. Revise records, fields, keys, validation and SQL selection, filtering and ordering.",
    examTip: "Read the required output columns, table and condition separately before writing the SQL statement.",
    cards: [
      ["Database", "An organised collection of data designed for efficient access and update."],
      ["Record", "A complete set of fields describing one entity in a table."],
      ["Primary key", "A field or combination of fields that uniquely identifies each record."],
      ["Foreign key", "A field that references a primary key in another table."],
      ["SQL", "A language used to query and modify relational databases."],
      ["SELECT query", "An SQL statement that chooses fields and records to return from a database."],
    ],
  },
  {
    paper: "Paper 2",
    name: "Ethical, Legal and Environmental Impacts",
    slug: "computing-impacts",
    specRef: "3.8",
    difficulty: 2,
    summary: "Digital systems affect privacy, employment, access, culture and the environment. Decisions are shaped by legislation and competing stakeholder interests.",
    examTip: "Identify who gains, who may be harmed and whether the impact is short or long term before reaching a judgement.",
    cards: [
      ["Data Protection Act", "UK legislation setting principles and responsibilities for processing personal data."],
      ["Computer Misuse Act", "UK legislation making unauthorised access and certain computer attacks criminal offences."],
      ["Copyright", "Legal protection for creators' original work against unauthorised copying or use."],
      ["Digital divide", "Unequal access to digital devices, connectivity or skills."],
      ["E-waste", "Discarded electronic equipment that may contain valuable and hazardous materials."],
      ["Stakeholder", "A person or group affected by or able to influence a decision."],
    ],
  },
];

const businessTopics: TopicSeed[] = [
  {
    paper: "Paper 1",
    name: "Business in the Real World",
    slug: "business-real-world",
    specRef: "3.1",
    difficulty: 2,
    summary: "Businesses identify opportunities, set objectives, choose ownership, locate operations, plan growth and balance stakeholder interests.",
    examTip: "Apply every point to the business in the case study. A generic advantage without context is rarely developed analysis.",
    cards: [
      ["Entrepreneur", "A person who organises resources, takes risk and starts or develops a business."],
      ["Revenue", "Income received from selling goods or services."],
      ["Profit", "Revenue remaining after total costs have been deducted."],
      ["Limited liability", "Owners can normally lose only the amount invested in the business."],
      ["Stakeholder", "A person or group with an interest in the decisions and performance of a business."],
      ["Business objective", "A measurable target that guides business decisions, such as survival, growth or profit."],
    ],
  },
  {
    paper: "Paper 1",
    name: "Influences on Business",
    slug: "business-influences",
    specRef: "3.2",
    difficulty: 3,
    summary: "Technology, ethics, the economy, globalisation, legislation and competition create opportunities and constraints for business decisions.",
    examTip: "Build a chain from the external change to a cost, revenue, demand or reputation effect, then to the objective.",
    cards: [
      ["Interest rate", "The percentage cost of borrowing or reward for saving."],
      ["Exchange rate", "The value of one currency measured in another currency."],
      ["Inflation", "A sustained rise in the general price level, reducing purchasing power."],
      ["Globalisation", "Increasing economic connection between countries through trade, investment and communication."],
      ["Competition", "Rivalry between businesses seeking the same customers."],
      ["Legislation", "Laws that create duties and constraints for business activity."],
    ],
  },
  {
    paper: "Paper 1",
    name: "Business Operations",
    slug: "business-operations",
    specRef: "3.3",
    difficulty: 2,
    summary: "Operations transform inputs into products and services. Key decisions include production methods, procurement, inventory, quality and customer service.",
    examTip: "When evaluating an operational choice, consider cost, quality, speed, flexibility and the specific product.",
    cards: [
      ["Job production", "Making one customised product at a time."],
      ["Flow production", "Continuous production where standardised items move through a sequence of stages."],
      ["Procurement", "Obtaining the goods and services a business needs from suppliers."],
      ["Inventory", "Raw materials, work in progress and finished goods held by a business."],
      ["Quality assurance", "Designing processes to prevent defects throughout production."],
      ["Capacity utilisation", "The percentage of maximum possible output currently being produced."],
    ],
  },
  {
    paper: "Paper 1",
    name: "Human Resources",
    slug: "business-human-resources",
    specRef: "3.4",
    difficulty: 2,
    summary: "Human resources covers organisational structure, recruitment, selection, training, motivation and the financial and non-financial rewards used to support performance.",
    examTip: "Link the HR decision to employee behaviour, productivity, cost, quality or staff retention.",
    cards: [
      ["Organisational structure", "The arrangement of roles, responsibilities and authority in a business."],
      ["Span of control", "The number of employees directly managed by one manager."],
      ["Recruitment", "The process of attracting and selecting people for a job."],
      ["Training", "Developing employee knowledge and skills for current or future work."],
      ["Motivation", "The willingness of employees to work effectively towards objectives."],
      ["Labour productivity", "Output produced per employee over a period."],
    ],
  },
  {
    paper: "Paper 2",
    name: "Marketing",
    slug: "business-marketing",
    specRef: "3.5",
    difficulty: 3,
    summary: "Marketing identifies customer needs and creates a suitable product, price, promotion and place strategy for a target market.",
    examTip: "Use market evidence from the case study and explain how the elements of the marketing mix reinforce each other.",
    cards: [
      ["Market research", "Collecting and analysing information about customers, competitors and a market."],
      ["Segmentation", "Dividing a market into groups with shared characteristics or needs."],
      ["Target market", "The customer group at which a product and its marketing are directed."],
      ["Marketing mix", "The coordinated decisions about product, price, promotion and place."],
      ["Product differentiation", "Making a product appear meaningfully different from competitors' products."],
      ["Market share", "A business's sales as a percentage of total sales in the market."],
    ],
  },
  {
    paper: "Paper 2",
    name: "Finance",
    slug: "business-finance",
    specRef: "3.6",
    difficulty: 3,
    summary: "Finance measures performance and supports decisions through cash flow, sources of finance, revenue, costs, profit, break-even and financial ratios.",
    examTip: "Show the formula, substitute values and interpret the result for the named business.",
    cards: [
      ["Cash flow", "Money entering and leaving a business over time."],
      ["Fixed cost", "A cost that does not change directly with output in the short run."],
      ["Variable cost", "A cost that changes as output changes."],
      ["Break-even", "The output or sales level at which total revenue equals total cost."],
      ["Gross profit", "Sales revenue minus cost of sales."],
      ["Net cash flow", "Total cash inflows minus total cash outflows during a period."],
    ],
  },
  {
    paper: "Paper 2",
    name: "Quantitative Skills",
    slug: "business-quantitative-skills",
    specRef: "3.7",
    difficulty: 3,
    summary: "Business decisions use percentages, averages, revenue, cost, profit, cash flow, break-even, margin of safety, ratios and interpretation of charts and tables.",
    examTip: "Do not stop at the number. State what it means for the business and whether it supports the proposed decision.",
    cards: [
      ["Percentage change", "The change divided by the original value, multiplied by 100."],
      ["Average rate of return", "Average annual profit as a percentage of the initial investment."],
      ["Margin of safety", "Actual or forecast output minus break-even output."],
      ["Gross profit margin", "Gross profit divided by sales revenue, multiplied by 100."],
      ["Net profit margin", "Profit after operating expenses divided by sales revenue, multiplied by 100."],
      ["Market growth", "The percentage increase in total market sales over a period."],
    ],
  },
  {
    paper: "Paper 2",
    name: "Extended Response and Case Study Technique",
    slug: "business-exam-technique",
    specRef: "Assessment",
    difficulty: 3,
    summary: "Strong business answers use the case, analyse connected consequences, consider alternatives and reach a justified conclusion aligned to objectives.",
    examTip: "A conclusion should decide, use the most important case evidence and explain why the rejected alternative is less suitable.",
    cards: [
      ["Application", "Using specific information from the business case to make a point relevant."],
      ["Analysis", "Explaining a connected chain of consequences rather than listing effects."],
      ["Evaluation", "Weighing evidence and alternatives to reach a supported judgement."],
      ["Counterargument", "A relevant reason why the proposed choice may not produce the expected benefit."],
      ["Short-term effect", "A consequence likely to occur soon after a decision."],
      ["Long-term effect", "A consequence that develops over a longer period and may affect strategic objectives."],
    ],
  },
];

const subjectSeeds = [
  { name: "Religious Studies", slug: "religious-studies", icon: "landmark", color: "#7c3aed", topics: religiousStudiesTopics },
  { name: "Computer Science", slug: "computer-science", icon: "code", color: "#0891b2", topics: computerScienceTopics },
  { name: "Business", slug: "business", icon: "briefcase", color: "#2563eb", topics: businessTopics },
];

export const ADDITIONAL_SUBJECTS = subjectSeeds.map((subject) => ({
  ...subject,
  topics: subject.topics.map((topic, index) => ({
    paper: topic.paper,
    name: topic.name,
    slug: topic.slug,
    specRef: topic.specRef,
    tier: "both",
    difficulty: topic.difficulty,
    estimatedMinutes: topic.difficulty >= 3 ? 35 : 30,
    orderIndex: index + 1,
  })),
}));

export const additionalRevisionContent = Object.fromEntries(
  subjectSeeds.flatMap((subject) =>
    subject.topics.map((topic) => {
      const flashcards = topic.cards.map(([term, definition]) => ({ term, definition, hint: `Explain ${term.toLowerCase()} in your own words.` }));
      return [`${subject.slug}:${topic.slug}`, { summary: topic.summary, examTip: topic.examTip, flashcards, questions: questions(flashcards) }];
    })
  )
);
