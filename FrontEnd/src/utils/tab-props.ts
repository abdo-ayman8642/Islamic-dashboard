const tabProps = (name: string, index: number) => ({
  id: `${name}-tab-${index}`,
  "aria-controls": `${name}-panel-${index}`,
});

export default tabProps;
