import React from "react";
import ChipImg from "@/../public/chip.png";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleCardHidden } from "@/store/reducers/card";
import * as Styled from "./Card.styled";

interface IProps {
  type: string;
  number: string;
  cvv: string;
  validity: Date | string;
  owner: string;
  hidden: boolean;
}

const Card = ({ type, number, cvv, validity, owner, hidden }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <Styled.CardContainer>
      <Styled.NameBox>
        <Styled.CardName>
          Next <span className={type}>{type}</span>
        </Styled.CardName>
        <VisibilityRoundedIcon
          onClick={() => dispatch(toggleCardHidden({ type, hidden: !hidden }))}
        />
      </Styled.NameBox>
      <Styled.ImageAndCvvBox>
        <Styled.ImageStyled
          src={ChipImg}
          width={72}
          height={72}
          alt="Chip do Cartão"
        />
        <Styled.CardCvv>Cvv {cvv}</Styled.CardCvv>
      </Styled.ImageAndCvvBox>
      <Styled.CardNumber>{number}</Styled.CardNumber>
      <Styled.Box>
        <Styled.CardOwner>{owner}</Styled.CardOwner>
        <Styled.CardDate>
          {String(validity).replace(
            /(\d{2})(\d{2})\-(\d{2})\-(\w+)\:(\w+)\:(\w+)\.(\w+)/g,
            "$3/$2"
          )}
        </Styled.CardDate>
      </Styled.Box>
    </Styled.CardContainer>
  );
};

export default Card;
