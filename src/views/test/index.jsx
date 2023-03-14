import React, {useState} from "react";
import {Popover, Icon, Collapse, Radio, Button, Spin, Input, InputNumber, Switch, Select } from "antd";
import "./index.less";

const TextArea = Input.TextArea
const { Option } = Select;
const {Panel} = Collapse;

const mainBtns_base = [
  {
    label: 'Base Material',
    itemType: 'Radio',
    defaultValue: '1',
    options: [{
      value: '1',
      label: 'FR-4',
      disabled: true,
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA8CAMAAADhV0xWAAAC+lBMVEUAAADdz43DtnfAtHS7rnHAtHTAs4DSwXnYyYuflW3ayobPvni7rnC7rXG6rHG7r3S2qnaupHatona8r3GelW3Ft3igmG64qnWalG++tXCakWuJfl6fkWHazIzh0ZHCtHTMvYHNwIW6rXDEtXPIu4O5rXTCtX63rXvJuXSkmWy7rXGkmW3Cs3O/sHLEs3W8rXSNhmHYxn+bjWvSxYjJunbBtHvOvHWwpW6wo2/Dt4G7rHHCs3K9sX6mm2uuo3G5q3CsoGzCsnK6q3G+sHKflGbJuHXDtHLMvHWrn3TKu3SSh2C6rW6jmnOckV+pnGaom2VeWD/k1I+toGrq2pVhW0HdzYm7rXChlGKekV+ckFyZjVuXi1mBd063qm+rnmiqnWiTh1Z1bUtlX0RkXUOuoWufk2GViFd+dE2ekmGajlyZjFqWilhwaEnt3Zbo15Li0YzIuXbHt3Swo2ysn2ikmGWgk2CRhVWDeU9ya0xoYkVmYEXs25Xm1pDSwoDJunzDtHbFtnTDtHO9sHG2qG2voWibj158dVNjXUKvomqViliGfFByakhuZ0jv35ng0IzXyYrQwoXUxYLPwH2/snzNvnvHuHnGt3bAsXG8rnGnm2immWSilmSlmGOkl2KAeFWPg1OAd1F1blF4cE9vaU57cUtsZUdqZEZgWkDq2ZPczIjPwH/EtnjKune+sHbBs3K5qm+6rG6zpm64qW20p22zpmuaj2Oajl2PhVuNgliIflSMgVN6c1Jya099c013b0xuZ0pvZ0fAsnW+sHOzpnG8rnCwo3C7rW+vo2uglWajlmGYjmCfkl6Rh16De1aDelR3cVN4b0tpY0jy4Zrl1ZLfz4nby4fXyIbUxIbWx4PNvn3LvHm+sHConGutoGmek2adk2WUil+Wi1uJgFqGfViKgFaKf1KKflB6ck/fz47VxonLvYG6rneroG+ypWyypGurnWalmWaom2SVi16UiFn97KX0453u3pnj043XxXu2qnW4q3Kqn2ukmWt0a0mafrLOAAAATXRSTlMA/hQN+SUG/vlo/v389fDRt6eQcU9LRTApHBsXCf79+vXw7ezr4+HIwK+Ri1VFPDk0HRP29vDt7eTe3t3Vz83Jx7euqJiWhH59ZWJdW65nquQAAAYMSURBVEjH7ZZVWFNhHMaH3d3d3d3duo1trJsxBmPAxtgGw/Xo7g4JlUZCQpSSBhE7QBBE7O54Hr+J+Qg49Jb3Zrt5f+ff50C61S2t1GP0P9l6Lv/2Z1Q/1LB/8C9f07ftwSMQ94tsZk3oqn/JwIG8d3shkD5Dzbw54kzE5ENd8+/vy8MTU97N6z0NUcdxOWod6YEa3hX/7r43CUQTQ7XvAPQLOn3yPRdx7XvTOSu0tfeZ11dFYBOJJkh0XBbr3NXXKKuj1voVZv3GaNm1mQPVeAKbzS68lJgteoF4EHHGJeZo5P1H7mYjtPGPXcV9jscbE3DXLzvktJQeL2K10j9zqi++8ojxdt006a/+RQmKEBwOj3/u6YkNF8abM0Wk0+fPVLx5X2Wlz7iFWjn2L/49CTfLBZU4fPo1KUGI9/R82XLCiHS6yLVM0wt9RpjOxX2d+rdzk8vLBQJBwbUAExostkAo9D1+VUQKRHmfd3aJsRbbu0hd53YyvRv90kPLy7EhUk810TE5Vi3EX5MUhDiJSFnu97Kc80EM9vZ1rtPHdeDvPVPhEBQSiuV7+YSy8b4SAe0pujDcJOeukxOJ9MH10ef8fGsxQ6/54pT+7foXT/WvhwOAykuGsw3xkhEcAy7zwwWHrwOAiMSquOhx+msMehyPN+1t18gkJR8GhwcV+pChaRKJioiXxlUKhTCE7O5dvJsFiSR6gKrIj7Fm2OvZF1/4c7t2+idTqFQ4xe+GGgpN91KzgyQFRBpIIjk8B3bYxjRexIoOdH3IOQqS0NPNROmM+r18Q/3JSCSF+oQrDxQY4aBQ43SJg4mhIXkALDw8+bDZcZTplRxSdI7OvXOaJI7pWrmb/rpd42co0wyQSKqKq7TEYpk4KLPwRgjRhCCTVApp8W8RgGBjirjNij7/8MInawYA6Oo9vLC+53f/0l6YE6WlBgZneSrL4Jv+gMA8e+MpGyf1NaYRrruZI9oINnWs8/RGlDeDceyYLsf7kemP7TqIwRRblBpgeGRLS8sknoXACIqv9ym8jiEaVnqi0RqCmRnKxtQ1MZruXOaurwnh0yvvSB3UiO8dHIQ5YWGBLOGlAQJFoTYygtpiFWoi0ZEou4y+ZG4OstAQpCy68602gPhWnm71hSnfmzG2FyAYGKTyUp5ZBsMUfGY99qQxoTII1FF1GY02N0ccBgQyK/oHAKga1W/czzIO0RCQ6fKbz4KD4QqlnCsnw7iSUEdD2vMr6EtugIAIIoEaODe4izlWesBfZTN9xa+NnI054WCAdFAkBZZhYSlYASxV7uNvC0Kg4SSgDOaxJ0ms02ec8zPui1Gva3V1y0zn9Pn9kA0NSAMEpL+cH4wVMI3ALODZbHAZaTRDX/SlOBo4DCADl4yr+t4P9PSKbf7cymEYMgDwS/weg1kA02QLykA0caTRhOHk+BYnEiv6jBUnJsMDTJJ+4vH2rvQCDYFPVfFSsUwmANgaE9gmjoYvfWU5LU4ikACd4wIADPtaKWIhpD2NPKsZaMpjnjKY+XWgjQm3HV+GXou74ySKaI2kW+XFhOkUM6w8dPp3dBEDkh34fCpSkfSMCQAnjdm3HYO9LITZ2RERrSCBvCa3Ov1TV652fOCXDEoxAFtJSZLDQBltQQRwH/id7HMRdq10q6i8KrcMcXPstHGQjtV7MMaBQoHBlFw1AJwk1CeEZmkApzQJNKAzxVWxqyd2/l6ZUWJBocLgqdw0AHjiZ5R5pxkEEHkkNyrwSnNtA3r2394NPTcEPAanBf6EWwI1SlJlZmVXh9mdAv7iOLvaj7FbtHg3bj2bTgHXjc/zh1YoyS+agD8y98gH35q8ogHzIdpoR0AaDBBgChk0U5VQAJ5/pCYxMTc30XMhRDstUKZqDqyl0q8sK8UCAMJkRVE18XHttr+DkUqlghBKyAmBYXY1R6rjA6PCpNJREO01elAKlRLQq/e2hFK7mia/hqgmn6nLtLe3HUrM4PEQyC4uuVHeGFXlNaTd9nc6UkN6aH77y+SNuRle6yZ1/QMT+DVa1svvo89myH9o4tob8yH/pwOQbnWrc30BAsffF3nFYocAAAAASUVORK5CYII=',
    }, {
      value: '2',
      label: 'Aluminum',
      img: 'data:image/png;base64,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',
    }, {
      value: '3',
      label: 'Copper Core',
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA8CAMAAAAJ1/l9AAAC8VBMVEUAAAD+9OX715/71KD//Pb/6r//+vL//fr//fj/+/b40Jr///j///v/5r3/463/9uP/+e772aj/+/L6053+4rz/8t3505z30Zv41KH//ff51ab947//9eX/+vH/+fD716n//vr40Jr/+/H406D//fr826///vv+1aT//PX/47r/5L//5LP/58P//fn//ff+8t751aH93LL/+/L//vn/5sH+7tX83LP937j//fn50p3/+Or72q73z5r/+O33zpj93bT/9+b//fn3z5n/48D/+ez//fb///v/47782qv/+fP/+/T/37n/2KL/26P////qp37dl2v1yqj2zaz0x6X/+fH71rj3z6/82Lrxw5/zxqLzx6P1zKryxKD/+fP/+/T40LH0yaf/9uz51LX3zq72y6nyxaPmoHb/+/bwwJr/+O/wwZzqqYD/9Oj/+fX/9uv96NP9277717n607T50rPvs4v//Pj/+vH/9+797dfxwp3wv5rvvpj/8uT74cf92b3wtYzqqX/loHb/+/X98eH/79/+4MX71bf71bb2zKvzu5TopXvmoXf/9OH758772r3usYrnpHn/+Oz/7Nn928D317j1xJ/1vpfsuZXyuZHtrobnonj/9uj/9eP96tT/5Mv65Mr/4sj+3cH528D72bv31LL50bH30LD0z675xJ/vvJnvtpDxtY7usIjsq4Lppn3/+/L+89397t3/7Nv97tr/6tb/6NL/5s/748v92Lv1zqv0yKT2xJv2wJryvZjqtI7utofnrIT/8eH/7t353b/427394LX93bP726j72aH2ypbxt4/qsovkpX3gnnPemm7/+e3/8+X+8N386tH85sz/6cb63sb64MP63cP+3sL90a361aj0zKf1yKf6y6X6yKP3zqHww6D3zprxv47wu47psInssILqrX//+u/75dD+5L/617v94rnvyKv0xqPywZ3zwJzvuZPgnHD//vn/+Ov/9eX+6s372675y6j40aT2xqLzw5MKQO+xAAAAT3RSTlMA/v51Gw779u67tS4hGhQJ9vb19PLx7enn497d2NTGxLWhn5F1al1VVExBKvz7+/fx7Ovn5+bl393Xzc3FqqinmoWAfnx4dnZhVkg3NDIQHWVtNQAABalJREFUSMftlFVcmmEUhz903d3d3d3dG4iESg2URlRQBIUJYsxJDASR6aZzOmM6dW66uXDd3d3dXVd73w8U1rvcb789N1w95/zfcw4f8p///C306dZxWLNatYpk9FrN6rSt26PBn6vzOjU5YXpAIBBkMhqdToum06Ojowe1ndr4D9z6dZuITQRadDQdmHSgQ5kbGMgN5HLH9Pid3DH1Db+oSFZEo9EITmhojUCgc8Nqz/qFXKNTqlhGk8lkBAKfzw9nMpliJjM8nB/OR4twYYE6vX46LkwqvwiqTLHoJEap1GpjAFql8qRIDKqAEoEgw+u6P7a7vTXJZMDVPt2RUyKXr1wZhAJ+VRtidilhCZAhEASo8QN7XNqJB3xTKubpMRwOxy5XqVTnVbEAw3Mhll220rw7RilyFAgbWP87e2LaCT5ThDllw0F2GgxrIAbDWiEWYHx8pizIvGGXSBxOAH7tRd/YM9JMfBGmZKUeh7JDImEB4q3+ZEYB9IXPYlet2rQRFGDyCYHc4V/bDXRik0gr16v2HEObkxgMhlTyzI4VPifGJ2AhoSGxGY4CIEBYl6/0DmliTOlp1R5Lls8x3FGqP4m0luQVimr5UuJVIRrA/yIsYN4tYhK4YQ3cF65LxZTqz1uy8HgKxYuCx/uTluarsQ4KA0KyjVis/Wpw0uqLa70MG2OUTMJX7afoMPL0PawcihcggLIUj98uxLrYTgx5Yd28JDiJfBTOZdMGJZNW2z27rjR9b9aWxRUV3t6L0QIvgO7CSCSSycDPw0EYG3eLwsPclt/ylH5P1pUKXz8/P6ePZxe67AI80eELUJ1VtjFGFOZ2vIPl57O2+PlS2b6+3lX+4gKnrN4uiQN6CJm8ZPMRHO54XmxGmVkZPdOtu96ypYJK9YF+VX/K0nzUtntJpKz4uLgQIhkUIDIMSatjMzbtDpvr0keeyanwAVBR38/hg/mpseqXDKlUIgE+6A/94ODg1aszVpm5bm9vf/oKVaFQ+FB9dtzNB3qVby3wXktiZEsl4ADh81Ef7m9VDB1x0a54i0LAEygi4M0dRfuDAhT0AEjgAh39QQByCHkJWGBShljZ0KW3Sk8X8CJ4vJ04iM3hw/1V+1IpzB8CH7AZxC+jv+vn0ptHFl+JjIjgHUH1SDacn7fjgPzhATOygc5i2O6yHe9PEpvP9nXprStz5Dcj8yJ5O4/jXu24SWVX5Q+ozp+dbXsFPwRwAWvMzEtn+7v0Cbc5e08LIiMjeAIeugC4P4dfnd/xsCNwgkH8uEtnG7t0z1ucxHT9TaBHCBQKdIFw/lfBP6AqfwAOxQb2F0QgXosfgbio6XGPs3yvnALzCwTAdx1QAMyPJ5Hwx6F9VxL3uIQZf/3ao+mIG/VuaTQc9qm9AjhAAdSdfvX7/W3HcUe9JaxzJ7Ufcq9fGlDTXW/kUcnhaI6Uyy0CsD+F8/3Q92KdKy/PhO/3D2BkG0rEF3Jzc68/mo18Re+D9zScRE2eXm5hgwLV+XPkaQ9V5VotCxa4UGJ6+GlrrjV3X3vkG6Z5qDUcTWKiQFWst/gJFM78pefWhUZF5WdiLJlBGMwFa/K2bdu27m8Bon/DJDA+wIoVQu/04tIzmeDr4eebozMaQ0NDow5npmpVSxMSkpNRuyHyPZ4etxM1HE7iiuXLhDZKZlCxLk2nk9vtRqBHrduekpKSAH3rk9GNkB+xoPmh+2CA0F+2bL1aXWjMz3tptxcUwP7rDh+GfvLlJ5ORn1CzqwcoAPwVQF+PVQuFhYXGrTcuX76RAvqvO5yScG3fqPnIz2lU7+ChyuWg/3Knf+dAu+49PTvv3wr6J3/cN7Qn8msadm/lcajyPvCXAb/wgCcC6bvfeuP9vvH9kD+gf9fWBw/e+nz7TlTlnQNVd9G085zGyB+z0LPe2DZDmh5og/znP/8YXwDELQV+CVbHcQAAAABJRU5ErkJggg==',
    }, {
      value: '4',
      label: 'Rogers',
      img: 'https://cart.jlcpcb.com/newCart/img/Rogers.5214e757.png',
    }, {
      value: '5',
      label: 'PTFE Teflon',
      img: 'https://cart.jlcpcb.com/newCart/img/PTFE_Teflon.34f5c21a.png',
    }],
  },
  {
    label: 'Layers',
    itemType: 'Radio',
    defaultValue: 'value2',
    options: [{
      value: 'value_1',
      label: 'label_1',
      // disabled: true,
    }, {
      value: 'value_2',
      label: 'label_2',
    }],
  },
]
const collapses = [
  {
    defaultActiveKey: '1',
    key: '1',
    header: 'PCB Specifications',
    items: [
      {
        label: 'Different Design',
        // itemType: 'Radio',
        defaultValue: '1',
        options: [{
          value: '1',
          label: '1',
          // disabled: true,
        }, {
          value: '2',
          label: '2',
        }, {
          value: '3',
          label: '3',
        }],
      },
      {
        label: 'Delivery Format',
        // itemType: 'Radio',
        defaultValue: '2',
        options: [{
          value: '1',
          label: '1',
          // disabled: true,
        }, {
          value: '2',
          label: '2',
        }, {
          value: '3',
          label: '3',
        }],
      },
      {
        label: 'PCB Thickness',
        // itemType: 'Radio',
        defaultValue: '2',
        options: [{
          value: '1',
          label: '1',
          // disabled: true,
        }, {
          value: '2',
          label: '2',
        }, {
          value: '3',
          label: '3',
        }],
      },
      {
        label: 'PCB Color',
        // itemType: 'Radio',
        defaultValue: 4,
        options: Array.from({length: 30}).map((_, i) => {
          return {
            label: i + 1,
            value: i + 1
          }
        }),
      },
      {
        label: 'Silkscreen',
        // itemType: 'Radio',
        defaultValue: 1,
        options: Array.from({length: 1}).map((_, i) => {
          return {
            label: 'White',
            value: 1 + i
          }
        }),
      },
      {
        label: 'Surface Finish',
        // itemType: 'Radio',
        defaultValue: 1,
        options: Array.from({length: 3}).map((_, i) => {
          return {
            label: 'HASL(with lead)' + i,
            value: 1 + i
          }
        }),
      }
    ]
  },
  {
    defaultActiveKey: '2',
    key: '2',
    header: 'High-spec Options',
    items: [
      {
        label: 'Outer Copper Weight',
        // itemType: 'Radio',
        defaultValue: '2',
        options: [
          {
            label: '1 oz',
            value: '0'
          },
          {
            label: '2 oz',
            value: '2'
          }
        ],
      },
      {
        label: 'Via Covering',
        // itemType: 'Radio',
        defaultValue: '2',
        options: [
          {
            label: 'Tented',
            value: '0'
          },
          {
            label: 'Untented',
            value: '2'
          },
          {
            label: 'Plugged',
            value: '3'
          },
          {
            label: 'Epoxy Filled & Capped',
            value: '4',
            disabled: true
          }
        ],
      },
      {
        label: 'Confirm Production file',
        // itemType: 'Radio',
        defaultValue: '2',
        options: [
          {
            label: 'No',
            value: '0'
          },
          {
            label: 'Yes',
            value: '2'
          }
        ],
      },
      {
        label: 'Remove Order Number',
        // itemType: 'Radio',
        defaultValue: '2',
        options: [
          {
            label: 'No',
            value: '0'
          },
          {
            label: 'Yes',
            value: '2'
          },
          {
            label: 'Specify a location',
            value: '3'
          }
        ]
      },
      {
        label: 'Flying Probe Test',
        // itemType: 'Radio',
        defaultValue: '2',
        options: [
          {
            label: ' Random Test ',
            value: '0'
          },
          {
            label: ' Fully Test ',
            value: '2'
          }
        ],
      },
      {
        label: '45°finger chamfered',
        // itemType: 'Radio',
        defaultValue: '0',
        options: [
          {
            label: ' No ',
            value: '0'
          },
          {
            label: ' Yes ',
            value: '2'
          }
        ],
      }
    ]
  },
  {
    defaultActiveKey: '3',
    key: '3',
    header: 'Advanced Options',
    items: [
      {
        label: '4-Wire Kelvin Test',
        defaultValue: '0',
        options: [
          {
            label: '1 oz',
            value: '0'
          },
          {
            label: '2 oz',
            value: '2'
          }
        ]
      }, {
        label: 'Paper between PCBs',
        defaultValue: '0',
        options: [
          {
            label: 'Tented',
            value: '0'
          },
          {
            label: 'Untented',
            value: '2'
          },
          {
            label: 'Plugged',
            value: '3'
          },
          {
            label: 'Epoxy Filled & Capped',
            value: '4',
            disabled: true
          }
        ]
      }, {
        label: 'Appearance Quality',
        defaultValue: '0',
        options: [
          {
            label: 'No',
            value: '0'
          },
          {
            label: 'Yes',
            value: '2'
          }
        ]
      }, {
        label: 'Silkscreen Technology',
        defaultValue: '0',
        options: [
          {
            label: 'No',
            value: '0'
          },
          {
            label: 'Yes',
            value: '2'
          },
          {
            label: 'Specify a location',
            value: '3'
          }
        ]
      }, {
        label: 'X-out board',
        defaultValue: '0',
        options: [
          {
            label: ' Random Test ',
            value: '0'
          },
          {
            label: ' Fully Test ',
            value: '2'
          }
        ]
      }, {
        label: 'Package Box',
        defaultValue: '0',
        options: [
          {
            label: ' No ',
            value: '0'
          },
          {
            label: ' Yes ',
            value: '2'
          }
        ]
      }]
  }
]

const tabs = [
  {
    label: 'Standard PCB/PCBA',
    img: 'https://cart.jlcpcb.com/newCart/img/pcb-white.a57a1f33.png',
    mainBtns: [
      ...mainBtns_base,
      {
        label: 'Product Type',
        itemType: 'Radio',
        options: [{
          value: '1',
          label: 'Industrial/Consumer electronics',
          // disabled: true,
        }, {
          value: '2',
          label: 'Aerospace',
        }, {
          value: '3',
          label: 'Medical',
        }],
      },
    ],
    collapses
  },
  {
    label: 'Advanced PCB/PCBA',
    img: 'https://cart.jlcpcb.com/newCart/img/advanced-white.31e9fe36.png',
    mainBtns: [
      ...mainBtns_base,
      {
        label: 'Test test',
        itemType: 'Radio',
        options: [{
          value: '1',
          label: 'Industrial',
          // disabled: true,
        }, {
          value: '2',
          label: 'Test2',
        }, {
          value: '3',
          label: 'Gdsxg',
        }],
      },
    ],
    collapses
  },
  {
    label: 'SMT-Stencil',
    img: 'https://cart.jlcpcb.com/newCart/img/smt-white.02016556.png',
    mainBtns: [
      ...mainBtns_base,
      {
        label: 'Framework',
        itemType: 'Radio',
        options: [{
          value: '1',
          label: 'Yes',
          // disabled: true,
        }, {
          value: '0',
          label: 'No',
        }],
        defaultValue: '1'
      },
    ],
    collapses: [],
  },
  {
    label: '3D Printing',
    img: 'data:image/png;base64,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',
    mainBtns: [
      ...mainBtns_base,
    ],
    collapses: [],
  },
]
const switchBoxes = [{
  label: 'PCB Assembly',
  value: 'PCB Assembly',
  key: 'checked_1',
  // checked: false,
  desc: 'Free Assembly for your PCB orde',
  img: 'https://cart.jlcpcb.com/newCart/img/stencil_icon_da.a6fb64ae.svg',
},{
  label: 'Stencil',
  value: 'Stencil',
  key: 'checked_2',
  // checked: false,
  desc: 'Order together with PCB',
  img: 'https://cart.jlcpcb.com/newCart/img/stencil_icon_da.a6fb64ae.svg',
}]
const Dashboard = () => {
  const [activeKey, setActiveKey] = useState(tabs[0].label);
  const [isEdit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(true);
  const [checked_1, setChecked_1] = useState(false);
  const [checked_2, setChecked_2] = useState(false);
  const switchHandler = (key, checked) => {
    console.log(key, checked, 'key, checked');
    const fn = key === 'checked_1' ? setChecked_1 : setChecked_2
    fn(checked)
  }
  const callback = (tab) => {
    console.log(tab);
    setActiveKey(tab.label)
  }
  const selectChange = (value) => {
    console.log(value);
  }
  const renderOptions = (options = []) => {
    return options.map(v => {
      return <Radio key={v.value} value={v.value} disabled={v.disabled}>
        {v.img ? <img src={v.img} width="30px" height="30px" className="verm mr5"/> : ''}
        {v.label}
      </Radio>
    })
  }
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  )
  const submit = () => {
    setLoading(true)
    console.log('submit')
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  const config = tabs.find(v => v.label === activeKey)
  return (
    <div className="app-container">
      <div className="quote-container">
        {/* 内容详情 */}
        <div className="content-wrap">
          <div className="new-quote-tab">
            {
              tabs.map((tab, i) => {
                return <div
                  className={`quote-tab-item ${activeKey === tab.label ? (i === 1 ? 'active-dark' : 'active-white') : ''}`}
                  key={tab.label}
                  onClick={callback.bind(null, tab)}
                >
                  <img src={tab.img} className="tab-img"/>
                  <span>{tab.label}</span>
                </div>
              })
            }
          </div>
          <div className="bgc">
            <div className="gerber-file-box">
              upload file todo...
            </div>
            {
              (config.mainBtns || []).map(item => {
                return <div className="main-btn-group" key={item.label}>
                  <label className="label">
                    {item.label}
                    <Popover content={content}>
                      <Icon type="question-circle"/>
                    </Popover>
                  </label>
                  <Radio.Group className="formgroup" name="radiogroup" defaultValue={item.defaultValue}>
                    {
                      renderOptions(item.options || [])
                    }
                  </Radio.Group>
                </div>
              })
            }
            <div className="main-btn-group">
              <label className="label">Dimensions
                <Popover content={content}>
                  <Icon type="question-circle"/>
                </Popover>
              </label>
              <div className="form-box mb15">
                <InputNumber className="mr10" min={1} max={10} defaultValue={3} onChange={(e) => {
                  console.error(e, 'input')
                }} />
                <span className="mr10">*</span>
                <InputNumber className="mr10" min={1} max={10} defaultValue={3} onChange={(e) => {
                  console.error(e, 'input')
                }} />
                <Select defaultValue="1" style={{ width: 120 }} onChange={selectChange}>
                  {
                    [{
                      value: '1',
                      label: 'mm',
                      // disabled: true,
                    }, {
                      value: '2',
                      label: 'inch',
                    }].map(v => <Option key={v.value} value={v.value} disabled={v.disabled}>{v.label}</Option>)
                  }
                </Select>
              </div>
            </div>
            <div className="main-btn-group">
              <label className="label">
                PCB Qty
                <Popover content={content}>
                  <Icon type="question-circle"/>
                </Popover>
              </label>
              <Select className="mb15"
                      optionFilterProp="children"
                      showSearch
                      filterOption={(input, option) => {
                        console.error(option, input, 'option input')
                        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      }
                      defaultValue="1" style={{ width: 120 }} onChange={selectChange}>
                {
                  Array.from({length: 30}).map((_, i) => ({
                    value: ++i,
                    label: 'label_' + i,
                    // disabled: true,
                  })).map(v => <Option key={v.value} value={v.value} disabled={v.disabled} label={v.label}>{v.label}</Option>)
                }
              </Select>
            </div>
            {
              (config.collapses || []).map(item => {
                return <Collapse key={item.header} className="collapse" expandIconPosition="right" defaultActiveKey={item.defaultActiveKey}>
                  <Panel header={item.header} key={item.key}>
                    {
                      (item.items || []).map(v => {
                        return <div className="main-btn-group" key={v.label}>
                          <label className="label">
                            {v.label}
                            <Popover content={content}>
                              <Icon type="question-circle"/>
                            </Popover>
                          </label>
                          <Radio.Group className="formgroup" name="radiogroup" defaultValue={v.defaultValue}>
                            {
                              renderOptions(v.options)
                            }
                          </Radio.Group>
                        </div>
                      })
                    }
                  </Panel>
                </Collapse>
              })
            }
          </div>
          {
            switchBoxes.map(v => {
              const checked = v.key === 'checked_1' ? checked_1 : checked_2
              return <div key={v.name} className="mt20">
                <div key={v.name} className="switch-box">
                  <img src={v.img} width="40px" height="40px" className="pull-left mt16"/>
                    <strong className="label">{v.label}</strong>
                    <span className="noticeTxt nowrap">{v.desc}</span>
                    <Switch checked={checked} onChange={switchHandler.bind(null, v.key)}/>
                </div>
                <div className={`no-upload-box ${checked ? '' : 'hide'}`}>
                  v:key --> {v.key}
                  <div style={{'backgroundColor': '#f00'}}> Please upload Gerber files before proceeding to PCB Assembly</div>
                  <div style={{'backgroundColor': '#f0f'}}> Please upload Gerber files before proceeding to PCB Assembly</div>
                </div>
              </div>
            })
          }
        </div>
        {/* 支付栏 */}
        <Spin spinning={loading}>
          <div className="right-wrap">
            <div className="box-wrap">
              <div className="flex-center-between header">
                <span className="label">Charge Details</span>
                <Icon className={`arrow ${showDetail ? '' : 'active'}`} type="up" onClick={() => setShowDetail(!showDetail)} />
              </div>
              <div className={showDetail ? 'show' : 'hide'}>
                <div className="flex-center-between item">
                  <span className="label">Special Offer</span>
                  <span>$2.00</span>
                </div>
                <div className="flex-center-between item">
                  <span className="label">Via Covering</span>
                  <span>$2.00</span>
                </div>
                <div className="flex-center-between item">
                  <span className="label">Surface Finish</span>
                  <span>$2.00</span>
                </div>
              </div>
              <div className="line"></div>

              <div className="flex-center-between header">
                <span className="label">
                  Build Time
                  <Popover content={content}>
                    <Icon className="ml8" type="question-circle"/>
                  </Popover>
                </span>
              </div>
              <div className="flex-center-between item">
                <span className="label">PCB</span>
                <div style={{flex: 1}} className="flex-center-between">
                  <span><Icon type="check-circle" theme="filled" className="ml8 checked"/> 4-5days</span>
                  <span>$2.00</span>
                </div>
              </div>
              <div className="line"></div>

              <div className="flex-center-between header">
                <span className="label">Calculated Price</span>
                <span className="total">$121.50</span>
              </div>
              <p className="desc">Additional charges may apply for special cases</p>
              <Button className="pay-btn" type="primary" onClick={submit}>
                SAVE TO CART
              </Button>
            </div>
            <div className="box-wrap">
              <div className="flex-center-between header" style={{paddingTop: 0}}>
                <span className="label">Shipping Estimate</span>
              </div>
              <div className="flex-center-between item">
                <span className="label">Charge:</span>
                <span>Choose destination country first</span>
              </div>
              <div className="flex-center-between item">
                <span className="label">Weight</span>
                <span>0.15kg</span>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Dashboard;
