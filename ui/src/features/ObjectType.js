import React from "react";
import styled from "@emotion/styled";
import Card from "../components/Card";
import CardBody from "../components/CardBody";
import Tag from "../components/Tag";

const Header = styled(`h1`)`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  letter-spacing: -0.5px;
  line-height: 25px;
  font-family: "Roboto", sans-serif;
  margin-bottom: 15px;
`;

const Flex = styled("div")`
  display: flex;
`;

const Abbreviation = styled("p")`
  height: 25px;
  width: 39px;
  color: #dedede;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.5px;
  line-height: 25px;
  margin: 0;
  margin-left: 10px;
`;

const TagsListContainer = styled("div")`
  margin-left: 15px;
`;

const TagsListItem = styled("span")`
  height: 20px;
  width: 145px;
  color: rgba(38, 38, 38, 0.25);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: italic;
  line-height: 20px;
  margin: 0;
  text-decoration: ${props => (props.underline ? "underline" : "none")};
`;

const Description = styled("p")`
  color: #333333;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 22px;
`;

export default function ObjectType({
  name,
  abbreviation,
  resourceType,
  tags,
  description
}) {
  return (
    <Card>
      <CardBody>
        <Flex>
          <Header>{name}</Header>
          {abbreviation && <Abbreviation>{abbreviation}</Abbreviation>}
        </Flex>

        <Flex>
          {resourceType && (
            <Tag resourceType={resourceType}>{resourceType}</Tag>
          )}
          {tags && tags.length > 0 && (
            <TagsListContainer>
              {tags.map((tag, index, list) => {
                return (
                  <div key={tag.key}>
                    <TagsListItem underline>{tag}</TagsListItem>
                    <TagsListItem>
                      {list.length - 1 === index ? `` : `, `}
                    </TagsListItem>
                  </div>
                );
              })}
            </TagsListContainer>
          )}
        </Flex>

        <Flex>
          <Description>{description}</Description>
        </Flex>
      </CardBody>
    </Card>
  );
}
