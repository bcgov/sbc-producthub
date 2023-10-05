const labelsRaw = [
  {
    node: {
      id: "Z2lkOi8vcmFwdG9yL0xhYmVsLzc0MzQ3OTEz",
      name: "Assets",
    },
  },
  {
    node: {
      id: "Z2lkOi8vcmFwdG9yL0xhYmVsLzgzOTc5NA",
      name: "bug",
    },
  },
];

const labelExpected = [
  {
    id: "Z2lkOi8vcmFwdG9yL0xhYmVsLzc0MzQ3OTEz",
    name: "Assets",
  },
  {
    id: "Z2lkOi8vcmFwdG9yL0xhYmVsLzgzOTc5NA",
    name: "bug",
  },
];

import { getLabels } from '../composable/classifyRelease';

describe('helper functions test', () => {

    test("test getLabel function", async() => {
        const res = getLabels(labelsRaw)
        for (let i = 0; i<res.length; i++) {
            const expected = labelExpected[i]
            const actual = res[i]
            expect(actual.id).equals(expected.id)
            expect(actual.name).equals(expected.name);
        }
    })
})