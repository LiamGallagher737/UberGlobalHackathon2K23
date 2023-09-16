const URL = 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/make';

export type KeyValue = {
    title: string;
    value: string;
};

type ApiResponse = {
    menuItem: KeyValue[];
};

/**
 * @param year The year the car was made in
 * @returns The manufacturers of cars in the given year, null if unable to query
 */
export async function manufacturers(year: number) {
    const response = await fetch(`${URL}?year=${year}`);

    if (!response.ok) return null;

    const data: ApiResponse = await response.json();
    return data.menuItem;
}

/**
 * @param year The year the car was made in
 * @param manufacturer The manufacturer that made the car
 * @returns The models produced by the given manufacturer in the given year, null if unable to query
 */
export async function models(year: number, manufacturer: string) {
    const response = await fetch(`${URL}?year=${year}&make=${manufacturer}`);
    if (!response.ok) return null;
    const data: ApiResponse = await response.json();
    return data.menuItem;
}

/**
 * @param year The year the car was made in
 * @param manufacturer The manufacturer that made the car
 * @param model The model of car
 * @returns The specific models produced by the given manufacturer for the given make in the given year, null if unable to query
 */
export async function specificModels(year: number, manufacturer: string, model: string) {
    const response = await fetch(`${URL}?year=${year}&make=${manufacturer}&model=${model}`);
    if (!response.ok) return null;
    const data: ApiResponse = await response.json();
    return data.menuItem;
}

/**
 * @param id The ID of the car to lookup
 * @returns The infomation about the car with the given ID
 */
export async function carData(id: string) {
    const response = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${id}`);
    if (!response.ok) return null;
    const data: CarInfo = await response.json();
    return data;
}

export type CarInfo = {
    atvType: string;
    barrels08: string;
    barrelsA08: string;
    c240Dscr: string;
    c240bDscr: string;
    charge120: string;
    charge240: string;
    charge240b: string;
    city08: string;
    city08U: string;
    cityA08: string;
    cityA08U: string;
    cityCD: string;
    cityE: string;
    cityUF: string;
    co2: string;
    co2A: string;
    co2TailpipeAGpm: string;
    co2TailpipeGpm: string;
    comb08: string;
    comb08U: string;
    combA08: string;
    combA08U: string;
    combE: string;
    combinedCD: string;
    combinedUF: string;
    createdOn: Date;
    cylinders: string;
    displ: string;
    drive: string;
    emissionsList: EmissionsList;
    engId: string;
    eng_dscr: string;
    evMotor: string;
    feScore: string;
    fuelCost08: string;
    fuelCostA08: string;
    fuelType: string;
    fuelType1: string;
    fuelType2: string;
    ghgScore: string;
    ghgScoreA: string;
    guzzler: string;
    highway08: string;
    highway08U: string;
    highwayA08: string;
    highwayA08U: string;
    highwayCD: string;
    highwayE: string;
    highwayUF: string;
    hlv: string;
    hpv: string;
    id: string;
    lv2: string;
    lv4: string;
    make: string;
    mfrCode: string;
    model: string;
    modifiedOn: Date;
    mpgData: string;
    mpgRevised: string;
    phevBlended: string;
    phevCity: string;
    phevComb: string;
    phevHwy: string;
    pv2: string;
    pv4: string;
    range: string;
    rangeA: string;
    rangeCity: string;
    rangeCityA: string;
    rangeHwy: string;
    rangeHwyA: string;
    startStop: string;
    trans_dscr: string;
    trany: string;
    UCity: string;
    UCityA: string;
    UHighway: string;
    UHighwayA: string;
    VClass: string;
    year: string;
    youSaveSpend: string;
    baseModel: string;
    sCharger: string;
    tCharger: string;
};

export type EmissionsList = {
    emissionsInfo: EmissionsInfo[];
};

export type EmissionsInfo = {
    efid: string;
    id: string;
    salesArea: string;
    score: string;
    scoreAlt: string;
    smartwayScore: string;
    standard: string;
    stdText: string;
};
