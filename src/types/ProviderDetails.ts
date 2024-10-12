export interface ProviderDetails {
    ProviderId: string;
    ProviderName: string;
    Address: string;
    City: string;
    State: string;
    Zip: string;
    Phonenumber: string;
    Email?: string;
    Website?: string;
    Pictures?: string;
    CreatedDate: string;
    UntilDate: string | null;
    ImporterProviderDetails: ImporterProviderDetails[];
    Profiles: Profile[];
    Questions: Question[];
    Awards: any; // You might want to specify a proper type for this
    DistanceInMiles: number;
    ratings?: number;
    CMS: Rating;
    CurrentProvider?: string;
    IsPreffered?: boolean;
}

export interface Providers {
    code: string;
    name: string;    
    phone: string;
    email?: string;
    services: string[];
    tags?: string[];
    images: Image[];
    locations: Address[];
    rating?: CMSRatings;
    isPreffered?: boolean;
    distanceInMiles?: number;
    website?: string;
    sections?: Section[];
    isRatingsAviable: boolean;
}

export interface CMSRatings {
    overall: number;
    healthInspection: number;
    qualityMeasure: number;
    staffRating: number;
    longStayQuality: number;
    shortStatyQuality: number;
    LastUpdated: string;
    moreinfo?: string;
    abusereport?: string;
}

export interface Image {
    imagePath: string;
    imageOrder: number;
}

export interface Address {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    addressType?: string;
}

export interface Rating {
    Overall: number;
    HealthInspection: number;
    QualityMeasure: number;
    StaffRating: number;
    LongStayQM: number;
    LastUpdated: string;
}

interface ImporterProviderDetails {
    PartnerComprehensiveCare: string;
    PartnerCare: string;
    Accessability: string;
    Languages: string;
    PaymentOptions: string;
    GroupAffiliation: string;
    NetworkPlan: string;
    Questions: ProviderQuestion[];
}

interface ProviderQuestion {
    BriefOverview: string;
    HoursOperations: string;
    ExperienceWithMS: string;
    MSUniquePatientsSeenAnnually: string;
    SpecializedMSTraining: string;
    HomeVisitsTelemedicineOffered: string;
}

interface Profile {
    ProviderId: string;
    CategoryId: number;
    CategoryName: string;
    CategoryGroupName: string;
    ParentCategoryId: number;
    CategoryDescription: string;
    CategoryIconAttribute: string;
    CategoryButtonText: string;
    ParentCategoryDescription: string;
    ParentCategoryIconAttribute: string;
}

export interface Question {
    QuestionId: string;
    QuestionText: string;
    Response: ResponseOption[];
}

export interface ResponseOption {
    ResponseOptionId: string;
    ResponseOptionText: string;
}

export interface Section {
    id: number;
    code: string;
    sectionName: string;
    careType: string;
    subSections: SubSection[];
}

export interface SubSection {
    id: number;
    subSectionName: string;
    questions: Questions[];
}

export interface Questions {
    id: number;
    questionText: string;
    responses: Responses[];
}

export interface Responses {
    id: number;
    responseText: string;
}
