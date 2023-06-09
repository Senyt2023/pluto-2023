import React, { useState } from "react";
import { ScrollArea, Checkbox, createStyles } from "@mantine/core";
import tw from "twin.macro";
import styled from "@emotion/styled";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor: "#3D5AFE",
    color: "#FFFFFF",
  },
}));

const HeaderContainer = styled.div`
  ${tw`flex justify-between w-full py-2 h-12 border-b-2`}
`;

const HeaderItems = styled.div(() => [
  tw`ml-6 my-0 pr-1 font-light flex justify-start items-center  text-textColor-tertiary `,
]);

const RowContainer = styled.div`
  ${tw`my-0 pr-1 font-light flex justify-between items-center w-full rounded-lg h-12 hover:bg-backgroundColor-secondary`}
`;

const RowItems = styled.div(({ tertiary }) => [
  tw`ml-6 my-0 pr-1 font-semibold flex justify-start items-center  group-hover:text-accent-primary`,
  tertiary && tw`text-textColor-tertiary`,
]);

export const ProductSelection = ({
  data,
  selectedProducts,
  handleProductSelection,
}) => {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState([""]);
  const toggleRow = (id) => {
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
    const updatedSelectedProducts = selectedProducts.includes(id)
      ? selectedProducts.filter((item) => item !== id)
      : [...selectedProducts, id];

    handleProductSelection(updatedSelectedProducts);
  };
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const list = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <RowContainer
        className={cx("group", { [classes.rowSelected]: selected })}
        key={item.id}
      >
        <RowItems tertiary className="w-20">
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
            className="w-full"
          />
          {item.id}
        </RowItems>
        <RowItems className="w-1/5">{item.product}</RowItems>
        <RowItems tertiary className="w-1/5">
          {item.category}
        </RowItems>
        <RowItems className="w-24">{item.price}</RowItems>
      </RowContainer>
    );
  });

  return (
    <div className="flex flex-col">
      <HeaderContainer>
        <HeaderItems className="w-20">
          <Checkbox
            onChange={toggleAll}
            checked={selection.length === data.length}
            indeterminate={
              selection.length > 0 && selection.length !== data.length
            }
            transitionDuration={0}
            className="w-full"
          />
          ID
        </HeaderItems>
        <HeaderItems tertiary className="w-1/5">
          Product
        </HeaderItems>
        <HeaderItems secondary className="w-1/5">
          Category
        </HeaderItems>
        <HeaderItems secondary className="w-24">
          Price
        </HeaderItems>
      </HeaderContainer>
      <ScrollArea h={420} scrollbarSize={4} offsetScrollbars>
        {list}
      </ScrollArea>
    </div>
  );
};