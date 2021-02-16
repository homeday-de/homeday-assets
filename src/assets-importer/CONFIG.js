module.exports = {
  COLLECTIONS: [
    {
      name: 'Small icons',
      dir: 'S',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Icons/ic_', 'i'),
      filenameRegex: new RegExp('ic_([a-z0-9-]+)', 'i'),
      format: 'svg',
      isDefault: true,
    },
    {
      name: 'Medium illustrations',
      dir: 'M',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Icons M_ic_', 'i'),
      filenameRegex: new RegExp('ic_([a-z0-9-]+)', 'i'),
      format: 'svg',
    },
    {
      name: 'Medium illustrations (to-bo-deprecated)',
      dir: 'M-old',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Slidericon/ic_', 'i'),
      filenameRegex: new RegExp('ic_([a-z0-9-]+)', 'i'),
      format: 'svg',
    },
    {
      name: 'Large illustrations',
      dir: 'L',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Icons L_ic_', 'i'),
      filenameRegex: new RegExp('ic_([a-z0-9-]+)', 'i'),
      format: 'svg',
    },
  ],
};
