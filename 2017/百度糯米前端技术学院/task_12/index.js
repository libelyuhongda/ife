const data = [{
  label: "父节点1",
  children: [{
    label: "子节点1"
  }, {
    label: "子节点2"
  }]
}, {
  label: "父节点2",
  children: [{
    label: "子节点3"
  }, {
    label: "子节点4",
    children: [{
      label: "子节点5"
    }]
  }]
}]

new Tree(data, 'tree')
