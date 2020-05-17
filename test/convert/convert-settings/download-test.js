module.exports = {
  replaceSettings: {
    test: [
      {
        from: 'test',
        to: '試験(変換)'
      }
    ]
  },
  convertSettings: [
    {
      name: 'test',
      fixedValue: 'test',
      fromIndex: null,
      replaceKey: null,
      index: 0
    },
    {
      name: '変換',
      fixedValue: null,
      fromIndex: 2,
      replaceKey: 'test',
      index: 1
    },
    {
      name: '試験',
      fixedValue: null,
      fromIndex: 0,
      replaceKey: null,
      index: 2
    }
  ],
  csvHeaders: [
    { value: 0, text: 'テスト' },
    { value: 1, text: '試験' },
    { value: 2, text: '変換' }
  ]
}
