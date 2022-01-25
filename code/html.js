
// VirtualDOM -> RealDOM
function vd2td(virtualDom) {
  const dom = document.createElement(virtualDom.tag)
  if (virtualDom.attrs) {
    for (const key in virtualDom.attrs) {
      dom.setAttribute(key, virtualDom.attrs[key])
    }
  }
  if (virtualDom.children) {
    for (let i = 0; i < virtualDom.children.length; ++i) {
      dom.appendChild(vd2td(virtualDom.children[i]))
    }
  }
  return dom
}
const VD = {
  tag: 'div',
  attrs: {
    id: '1',
    class: 'outter'
  },
  children: [
    {
      tag: 'div',
      attrs: {
        id: '2',
        style: 'height: 200px;width: 200px;background: red'
      },
      children: [
        
      ]
    },
    {
      tag: 'div',
      attrs: {
        id: '3',
        style: 'height: 200px;width: 200px;background: blue'
      },
      children: [
        {
          tag: 'div',
          attrs: {
            id: '5',
            style: 'height: 100px;width: 100px;background: black'
          },
          children: [
            {
              tag: 'a'
            },
            {
              tag: 'a'
            }
          ]
        }
      ]
    },
    {
      tag: 'div',
      attrs: {
        id: '4',
        style: 'height: 200px;width: 200px;background: green'
      },
      children: [
        
      ]
    }
  ]
}
document.body.appendChild(vd2td(VD))



// {{}}模板字符串解析
function compile(str, data) {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key]
  })
}
const str = '我是{{name}}, 年龄{{age}}, 性别{{sex}}'
const data = {
  name: '姓名',
  age: 20
}
console.log(compile(str, data))



// 大量数据分片渲染
const maxPage = 10000
const pageSize = 20
let page = 0
const div = document.createElement('div')
document.body.appendChild(div)
function loop() {
  window.requestAnimationFrame(() => {
    for (let i = 0; i < pageSize; ++i) {
      const span = document.createElement('span')
      span.innerText = page * 20 + i
      div.appendChild(span)
    }
    ++page
    if (page <= maxPage) {
      loop()
    }
  })
}
loop()