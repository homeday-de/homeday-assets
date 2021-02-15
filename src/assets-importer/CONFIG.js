module.exports = {
  DEST: '/assets',
  COLLECTIONS: [
    {
      name: 'small',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Icons/ic_', 'i'),
      filenameRegex: new RegExp('ic_[a-z0-9-]+', 'i'),
      format: 'svg',
    },
    {
      name: 'medium',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Icons M_ic_', 'i'),
      filenameRegex: new RegExp('ic_[a-z0-9-]+', 'i'),
      format: 'svg',
    },
    {
      name: 'mediumOld',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Slidericon/ic_', 'i'),
      filenameRegex: new RegExp('ic_[a-z0-9-]+', 'i'),
      format: 'svg',
    },
    {
      name: 'large',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Icons L_ic_', 'i'),
      filenameRegex: new RegExp('ic_[a-z0-9-]+', 'i'),
      format: 'svg',
    },
  ],
};
