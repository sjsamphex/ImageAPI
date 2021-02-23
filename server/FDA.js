//https://api.fda.gov/food/enforcement.json?search=product_description:%22Canyon+Bakehouse+LLC%22

export const FDA = {
  meta: {
    disclaimer:
      'Do not rely on openFDA to make decisions regarding medical care. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated. We may limit or otherwise restrict your access to the API in line with our Terms of Service.',
    terms: 'https://open.fda.gov/terms/',
    license: 'https://open.fda.gov/license/',
    last_updated: '2021-02-17',
    results: {
      skip: 0,
      limit: 1,
      total: 2,
    },
  },
  results: [
    {
      country: 'United States',
      city: 'Thomasville',
      address_1: '1919 Flowers Cir',
      reason_for_recall:
        'The firm discovered that some of their products showed higher than acceptable levels of gluten. They placed the product on hold for destruction however, one shipper sent products into commerce for distribution.',
      address_2: '',
      product_quantity: '384cs/6/14 oz bags',
      code_info: 'Lot #032220316',
      center_classification_date: '20201221',
      distribution_pattern:
        'Product was shipped to the following states: AR, CO, CT, KS, LA, MA, MO, MS, MT, NE, NM, NY, OK, RI, SD, TX, UT & WY.',
      state: 'GA',
      product_description:
        'CANYON BAKEHOUSE GLUTEN FREE BAGELS EVERYTHING NET WT. 14 OZ (396g) Canyon Bakehouse, LLC Johnstown, CO 80534 UPC 8 53584 00221 8',
      report_date: '20201230',
      classification: 'Class II',
      openfda: {},
      recalling_firm: 'Flowers Foods (Corporate Offices)',
      recall_number: 'F-0182-2021',
      initial_firm_notification: 'Press Release',
      product_type: 'Food',
      event_id: '86905',
      recall_initiation_date: '20201202',
      postal_code: '31757-1137',
      voluntary_mandated: 'Voluntary: Firm initiated',
      status: 'Ongoing',
    },
  ],
};
