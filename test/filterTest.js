var fs = require('fs'),
	vm = require('vm'),
	assert = require('assert'),
	path = 'dxDataGridFilter.js',
	code,
	tests;

tests = [
	{	
		input: '',
		output: null
	},

	{
		input: ['param1','=','3'],
		output: '<Parameter><Start param1="3" /><End param1="" /><Compare param1="1" /></Parameter>'
	},

	{
		input: 
			[
				['param1','=','3'],
				'and',
				['param2','>','5']
			],
		output: '<Parameter><Start param1="3" param2="5" /><End param1="" param2="" /><Compare param1="1" param2="2" /></Parameter>'
	},

	{
		input: ['date1','<', new Date(2017,0,1)],
		output: '<Parameter><Start date1="" /><End date1="" /><Compare date1="03107" /></Parameter>'
	}
];

code = fs.readFileSync(path, 'utf-8');

vm.runInThisContext(code, path);

describe('dxDataGridFilter', function () {
	describe('processFilterArray', function () {
		it('should return null when \'\' is entered', function () {
			assert.equal(tests[0].output, dataGridFilter.processFilterArray(tests[0].input));
		});

		it('should return \n<Parameter><Start param1="3"/><End param1=""/><Compare param1="01"/></Parameter>\nwhen\n' +  tests[1].input.toString() + '\nis entered', function () {
			assert.equal(tests[1].output, dataGridFilter.processFilterArray(tests[1].input));
		});

		it('should return \n<Parameter><Start param1="3" param2="5" /><End param1="" param2=""/><Compare param1="1" param2="2"/></Parameter>\nwhen\n' +  tests[2].input.toString() + '\nis entered', function () {
			assert.equal(tests[2].output, dataGridFilter.processFilterArray(tests[2].input));
		});
	});
});

