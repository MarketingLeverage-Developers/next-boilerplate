export interface Car {
    uuid: string;
    carType: 'domestic' | 'import'; // "domestic" | "import"
    carBrand: string; // e.g. "기아"
    carClass: string; // e.g. "준대형 세단"
    thumbnailPath: string; // URL
    model: string; // e.g. "k8"
    releaseDate: string; // ISO 문자열 (혹은 Date)
    fuelType: string; // e.g. "가솔린"
    price: number; // 0 이상
    fuelEfficiency: string; // e.g. "12.3km/L"
    engineCC: number; // 배기량
    carImages: CarImages; // 내·외장 이미지
    trims: CarTrim[]; // 트림 목록

    thumbnail: string;
    isPromotion: boolean;
    isImmediately: boolean;
    carBrandLogo: string;

    advPayment: string;
    monthContract: string;
    monthRentalCost: number;
    originCost: number;
}

export interface CarImages {
    exteriors: ImageWithColors[]; // 외장 이미지
    interiors: ImageWithColors[]; // 내장 이미지
}

export interface ImageWithColors {
    uuid: string;
    category: 'ex' | 'in'; // "ex" 또는 "in"
    path: string; // 이미지 URL
    color: ColorInfo; // 선택 가능한 색상들
}

export interface ColorInfo {
    uuid: string;
    colorType: 'ex' | 'in'; // 외장/내장 구분
    name: string; // 색상 이름
    path: string; // 색상별 이미지 URL
}

export interface CarTrim {
    mainTrimId: string;
    trim: string; // 트림 이름
    subTrims: SubTrim[]; // 서브 트림
}

export interface SubTrim {
    subTrimId: string;
    subTrim: string; // 서브 트림 이름
    price: number; // 서브 트림 가격
}
