export class Customer {
    _id: string;
    name: string;
    description: string;
    members: string[];

    constructor() { }
}

export class User {
    user_id: string;
    connection: string;
    email: string;
    username: string;
    nickname: string;
    password: string;
    phone_number: string;
    picture: string;
    user_metadata: Map<string, any>;
    email_verified: boolean;
    verify_email: boolean;
    phone_verified: boolean;
    app_metadata: Map<string, any>;
    identities: Identity[];
    updated_at: string;
    created_at: string;

    constructor() { }
}

export class Identity {
    connection: string;
    user_id: string;
    provider: string;
    isSocial: boolean;

    constructor() { }
}

export class Users {
    total: number;
    users: User[];

    constructor() { }
}

export class Headquarter {
    id: number;
    customer_id: string;
    name: string;
    address: string;
    phone: string;
    created: Date;
    updated: Date;

    constructor() { }
}

export class Headquarters {
    total: number;
    headquarters: Headquarter[];

    constructor() { }
}

export class Product {
    id: number;
    name: string;
    brand: string;
    color: string;
    price: number;
    created: Date;
    updated: Date;

    constructor() {}
}

export class HeadquarterProduct {
    id: number;
    headquarter_id: number;
    product_id: number;
    amount: number;
    created: Date;
    updated: Date;

    constructor() {}
}

export class HeadquarterProducts {
    products : HeadquarterProduct[];

    constructor() {}
}