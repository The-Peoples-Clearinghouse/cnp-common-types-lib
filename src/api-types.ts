export type AmlValidationResponse = {
    externalValidationId: string; // The ID of the external validation service
    riskLevel: string;
    score: number;
    blockTransfer: boolean;
};

export type AmlValidation = {
    createdAt: number;
    rafikiPaymentId: string; // This is the unique id for the entity
    amount: number;
    fullName: string;
    addressState: string; // Mx country state
    dateOfBirth: number;
    curp: string;
    result: AmlValidationResponse;
};

export type SwitchParty = {
    fullName: string;
    firstNames: string;
    fatherSurname: string;
    motherSurname: string;
    //bankAccountId: string; //(bank acc id)
    recipientInstitutionId: string;
    nationalId: string;
    doB: number;
    countryOfBirth: string;
    addressState: string; // Country state
    fullAddress: string;
    citizenship: string;
    accountDisabled: boolean;

    idType: string; // For remittances will be the MSISDN (phone number)
    id: string; // For remittances will be the MSISDN (phone number)
};

export type Person = {
    id: string; // the uuid of the person
    ine: string | null;
    passport: string | null;
    curp: string | null;
    createdAtTs: number;
    lastUpdatedTs: number;
};

// multiples de estos para una persona
export type CnpParty = {
    fullName: string;
    //bankAccountId: string;
    recipientInstitutionId: string;
    cnpPersonId: string;
    dateOfBirth: number;
    countryOfBirth: string;
    addressState: string; // Mx country state
    fullAddress: string;
    citizenship: string;
    accountDisabled: boolean;

    rafikiWalletAddressId: string; // Uuid generated by Rafiki
    rafikiWalletAddressUrl: string; // The url address of the wallet

    msisdn: string;
    //Clabe?: string

    // Common
    createdAtTs: number;
    lastUpdatedTs: number;
};

export type ExchangeRate = {
    base: string;
    assetCode: string;
    dateTs: number;
    exchangeValue: number;
};

export type RafikiEvent = {
    eventId: string;
    eventData: object;
    eventType: string;
    receivedAtTs: number;
};

export const TransferStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    CANCELLED: 'CANCELLED',
} as const;
export type TransferStatus = keyof typeof TransferStatus;

export type Transfer = {
    cnpPersonId: string; // Related to the person national identifiers
    id: string;
    switchTransferId: string | null;
    amountSent: number;
    currencyCodeSent: string;
    fxRate: number;
    amountReceived: number;
    currencyCodeReceived: string;
    concept: string;
    status: TransferStatus;
    cancelationReason: string | null;
    initiatedAtTs: number;
    completedAtTs: number | null;
    updatedAtTs: number;

    senderInfo: {
        fullName: string;
        transferReference: string; // Rafiki payment id? us or mx?
        senderInstitutionId: string; // Id? if not exists, the same as transferReference
        extensionList: { key: string; value: string }[]; // TODO: Check extensionList
    };

    rafikiPaymentId: string; // (for reports)

    recipientInfo: {
        fullName: string;
        dateOfBirth: number;
        addressState: string; // Mx country state  leave this here? or in the party? is for the aml validation
        fullAddress: string;
        citizenship: string;
        countryOfBirth: string;

        nationalId: {
            // MX INE, passport, curp or other
            type: 'INE' | 'PASSPORT' | 'CURP';
            value: string;
        }[];

        // Come from the switch
        idType: 'MSISDN' | 'CLABE'; // For remittances will be the MSISDN. The party id type
        id: string; // The party id from the switch
        recipientInstitutionId: string; // (for reports)

        isLegalEntity: boolean;
        // TODO: add this info, it will be the same as the basic recipient info
        /* CompanyInfo?: {
      // Company info
      fullName: string
    }*/
        destinationOfficeName: string; // The name of the branch (for reports)
    };

    amlValidationResponse: AmlValidationResponse; // This come from the aml service
};

// #region APIs
export type RemittancesSummary = {
    remittancesTotalAmount: number;
    remittancesTotalVolume: number;
};

export type RemittancesAmounts = {
    date: number;
    totalAmount: number;
};

export type RemittancesVolume = {
    date: number;
    totalVolume: number;
};

export type TopRecipient = {
    recipientId: string;
    fullName: string;
    recipientInstitutionId: string;
    addressState: string;
    msisdn: string;
    totalAmountReceived: number;
    remittancesVolume: number;
};

export type PaginatedResponse<T> = {
    data: T[];
    totalPages: number;
    totalItems: number;
    pageIndex: number;
    pageSize: number;
};

// #End Region

export type TransferPublishObject = {
    transferId: string;
    transferDate: number;
    //feesCurrency: string
    senderInstitutionId: string;
    recipientInstitutionId: string;
};

export const Granularity = {
    hour: '1h',
    day: '1D',
    week: '7D',
    month: '1M',
    quarter: '3M',
    semester: '6M',
    year: '1Y',
} as const;
export type Granularity = keyof typeof Granularity;

export type WalletAddressNotFoundRequest = {
    walletAddressUrl: string;
};

// Inputs
export type UpdateIncomingPaymentInput = {
    id: string;
    metadata: object;
};

// Responses
export type CreateWalletAddressResponse = {
    id: string;
    createdAt: Date;
    publicName: string;
    url: string;
};

export type UpdateWalletAddressResponse = {
    id: string;
    url: string;
    status: string;
};

export type CreateIncomingPaymentWithdrawalResponse = {
    sucess: boolean;
};

export type UpdateIncomingPaymentResponse = {
    id: string;
    metadata: string;
};

export type GetRafikiAssetResponse = {
    node: {
        code: string;
        id: string;
    };
};

export type WalletAddress = {
    id: string;
    status: string;
    publicName: string;
    url: string;
    createdAt: string;
};

export type TransferFilters = {
    id?: string;
    recipientFullName?: string;
    senderFullName?: string;
    senderAddressState?: string;
    recipientAddressState?: string;
    initialDate: number;
    endDate: number;
    recipientInstitutionId?: string;
    senderInstitutionId?: string;
};

export type RecipientInstitutionRemittances = {
    totalAmountOfRemittances: number;
    totalNumberOfRemittances: number;
    recipientInstitutionId: string;
};

export type SenderInstitutionRemittances = {
    totalAmountOfRemittances: number;
    totalNumberOfRemittances: number;
    senderInstitutionId: string;
};

export type RemittancesSummaryByInstitutionsResponse = {
    senderInstitutions: SenderInstitutionRemittances[];
    recipientInstitutions: RecipientInstitutionRemittances[];
};

export type RemittanceData = {
    rafikiPaymentId: string;
    recipientFullName: string;
    senderFullName: string;
    recipientInstitutionId: string;
    amountReceived: number;
    completedAtTs: number;
};

export type RemittancesAndTotalReceivedAmount = {
    remittances: RemittanceData[];
    totalReceivedAmount: number;
};

export type RemittancesByInstitutionsResponse = {
    [key: string]: RemittancesAndTotalReceivedAmount;
};

export interface IncomingPaymentData {
    id: string;
    walletAddressId: string;
    client: string;
    createdAt: string;
    expiresAt: string;
    receivedAmount: {
        value: string;
        assetCode: string;
        assetScale: number;
    };
    completed: boolean;
    updatedAt: string;
    incomingAmount?: {
        value: string;
        assetCode: string;
        assetScale: number;
    };
    metadata: {
        description: string;
        [key: string]: string;
    };
    status: string;
}