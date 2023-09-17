const URL = 'https://www.fueleconomy.gov/ws/rest/vehicle/menu';

export type KeyValue = {
    text: string;
    value: string;
};

type ApiResponse = {
    menuItem: KeyValue[];
};

/**
 * @param year The year the vehicle was made in (1984 - present)
 * @returns The manufacturers of vehicles in the given year, null if unable to query
 */
export async function manufacturers(year: number) {
    const response = await fetch(`${URL}/make?year=${year}`, {
        headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch manufacturers');
    const data: ApiResponse = await response.json();
    return data.menuItem;
}

/**
 * @param year The year the vehicle was made in
 * @param manufacturer The manufacturer that made the vehicle
 * @returns The models produced by the given manufacturer in the given year, null if unable to query
 */
export async function models(year: number, manufacturer: string) {
    const response = await fetch(`${URL}/model?year=${year}&make=${manufacturer}`, {
        headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch models');
    const data: ApiResponse = await response.json();
    return data.menuItem;
}

/**
 * @param year The year the vehicle was made in
 * @param manufacturer The manufacturer that made the vehicle
 * @param model The model of vehicle
 * @returns The options for the given model produced by the given manufacturer in the given year, null if unable to query
 */
export async function options(year: number, manufacturer: string, model: string) {
    const response = await fetch(
        `${URL}/options?year=${year}&make=${manufacturer}&model=${model}`,
        {
            headers: { Accept: 'application/json' },
        }
    );
    if (!response.ok) throw new Error('Failed to fetch options');
    const data: { menuItem: KeyValue | KeyValue[] } = await response.json();
    return data.menuItem;
}

/**
 * @param id The ID of the vehicle to lookup
 * @returns The infomation about the vehicle with the given ID
 */
export async function vehicle(id: string) {
    const response = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${id}`, {
        headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch vehicle');
    const data: VehicleInfo = await response.json();
    return data;
}

export type VehicleInfo = {
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
    emissionsList: EmissionsList | null;
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
