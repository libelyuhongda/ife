// 判断给定数字是否为手机号码
console.log(/^1[34578]\d{9}$/.test('18812011232')) // 测试结果应该为 true
console.log(/^1[34578]\d{9}$/.test('18812312')) // false
console.log(/^1[34578]\d{9}$/.test('12345678909')) // false

// 判断输入的字符串是否有相邻重复单词
console.log(/(\s+|\b)([a-zA-Z]+)\s+\2/.test('foo foo bar')) // true
console.log(/(\s+|\b)([a-zA-Z]+)\s+\2/.test('foo bar foo')) // false  有重复单词但是不相邻
console.log(/(\s+|\b)([a-zA-Z]+)\s+\2/.test('foo  barbar bar')) // false
