// Product Category Mapping
// Maps category routes to BigCommerce product IDs
// When adding a new product, just add its ID to the appropriate category array

export interface CategoryConfig {
    title: string;
    productIds: number[];
}

export const productCategories: Record<string, CategoryConfig> = {
    // =====================
    // BILTONG
    // =====================
    "biltong": {
        title: "All Biltong",
        productIds: [709, 463, 740, 708, 745, 747, 737, 458, 627, 739], // All biltong products
    },

    // Traditional Biltong
    "biltong/traditional/lean": {
        title: "Lean Traditional Biltong",
        productIds: [740, 708], // Biltong Lean (Slab-8oz), Biltong Lean (Sliced)
    },
    "biltong/traditional/normal": {
        title: "Traditional Biltong",
        productIds: [709, 463], // Biltong (Slab-8oz), Biltong (Sliced)
    },
    "biltong/traditional/more-dry": {
        title: "More Dry Traditional Biltong",
        productIds: [747, 737], // Biltong More Dry (Slab-8oz), Biltong More Dry (Sliced)
    },
    "biltong/traditional/lean-more-dry": {
        title: "Lean More Dry Biltong",
        productIds: [745], // Biltong Lean and More Dry (Sliced)
    },

    // Flavored Biltong
    "biltong/flavored/chutney": {
        title: "Chutney Biltong",
        productIds: [627], // Chutney Biltong 8oz
    },
    "biltong/flavored/peri-peri": {
        title: "Peri Peri Biltong",
        productIds: [739], // Sweet Peri Peri Biltong
    },

    // =====================
    // CHILLI BITES
    // =====================
    "chilli-bites": {
        title: "All Chilli Bites",
        productIds: [743, 736, 742, 741], // All chilli bites
    },
    "chilli-bites/inferno": {
        title: "Inferno Chilli Bites",
        productIds: [743], // Chili Bites Inferno
    },
    "chilli-bites/mango-habanero": {
        title: "Mango Habanero Chilli Bites",
        productIds: [736], // Chili Bites Mango Habanero
    },
    "chilli-bites/mild": {
        title: "Mild Chilli Bites",
        productIds: [742], // Chili Bites Mild
    },
    "chilli-bites/spicy": {
        title: "Spicy Chilli Bites",
        productIds: [741], // Chili Bites Spicy
    },

    // =====================
    // DROEWORS
    // =====================
    "droewors": {
        title: "All Droewors",
        productIds: [735, 464, 744], // All droewors
    },
    "droewors/more-dry": {
        title: "More Dry Droewors",
        productIds: [735], // Droëwors - More Dry
    },
    "droewors/regular": {
        title: "Regular Droewors",
        productIds: [464], // Droëwors Regular
    },
    "droewors/peri-peri": {
        title: "Peri Peri Droewors",
        productIds: [744], // Peri Peri Droëwors (Spicy)
    },
};

// Helper to get all dried meat product IDs (for the main dried-meats page)
export const allDriedMeatProductIds = [
    // Biltong
    709, 463, 740, 708, 745, 747, 737, 458, 627, 739,
    // Chilli Bites
    743, 736, 742, 741,
    // Droewors
    735, 464, 744,
];
