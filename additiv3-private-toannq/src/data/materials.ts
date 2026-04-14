export interface Material {
    id: string;
    name: string;
    process: 'FDM' | 'SLA';
    description: string;
    keyAdvantages: string[];
    typicalApplications: string; // Changed to string based on visual design which looks like a block of text or list
    image: string;
    dataSheetUrl?: string;
}

export const materials: Material[] = [
    {
        id: 'abs',
        name: 'ABS',
        process: 'FDM',
        description: 'A widely used engineering thermoplastic known for its toughness and impact resistance. ABS is commonly used for enclosures, housings, and functional mechanical parts.',
        keyAdvantages: [
            'Good impact strength',
            'Moderate heat resistance',
            'Easy to post process and install heat set inserts'
        ],
        typicalApplications: 'Enclosures, brackets, housings, fixtures, and general purpose functional parts.',
        image: 'https://placehold.co/120x120/e6e6e6/0013DE?text=ABS',
        dataSheetUrl: '#'
    },
    {
        id: 'pla',
        name: 'PLA',
        process: 'FDM',
        description: 'A general purpose material optimized for ease of printing and surface quality. Best suited for visual prototypes and low load applications.',
        keyAdvantages: [
            'Excellent surface finish',
            'High dimensional accuracy',
            'Cost effective'
        ],
        typicalApplications: 'Concept models, visual prototypes, low stress parts, and fit checks.',
        image: 'https://placehold.co/120x120/e6e6e6/0013DE?text=PLA',
        dataSheetUrl: '#'
    },
    {
        id: 'nylon',
        name: 'Nylon (PA)',
        process: 'FDM', // Assuming FDM based on context, could be SLS but limiting to FDM/SLA for now
        description: 'Nylon materials are known for their toughness, fatigue resistance, and wear properties. Often used for demanding mechanical applications.',
        keyAdvantages: [
            'High strength and toughness',
            'Excellent wear and fatigue resistance',
            'Suitable for snap fits and moving assemblies'
        ],
        typicalApplications: 'Gears, brackets, clips, hinges, and functional mechanical components.',
        image: 'https://placehold.co/120x120/e6e6e6/0013DE?text=Nylon',
        dataSheetUrl: '#'
    },
    {
        id: 'resin-gp',
        name: 'Formlabs General Purpose Resins',
        process: 'SLA',
        description: 'We currently offer Formlabs general purpose resins, selected for their consistency, surface quality, and reliability across a wide range of applications.',
        keyAdvantages: [
            'High resolution and fine feature detail',
            'Smooth surface finish',
            'Tight dimensional tolerances'
        ],
        typicalApplications: 'High detail prototypes, cosmetic models, small enclosures, and form and fit testing.',
        image: 'https://placehold.co/120x120/e6e6e6/0013DE?text=Resin',
        dataSheetUrl: '#'
    }
];
