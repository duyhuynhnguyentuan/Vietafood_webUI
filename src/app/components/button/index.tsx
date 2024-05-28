import styled from "styled-components";
import tw from "twin.macro";

interface IButtonProps {
  theme?: "filled" | "outlined";
  text: string;
  className?: string;
  externalUrl?: string;
}

const BaseButton = styled.button`
  ${tw`
    pl-5
    pr-5
    pt-3
    pb-3
    outline-none
    rounded-md
    text-white
    text-xs
    font-semibold
    border-transparent
    border-2
    border-solid
    focus:outline-none
    transition-all
    duration-200
    ease-in-out
    m-1
  `};
`;

const OutlinedButton = styled(BaseButton)`
  ${tw`
    bg-primary
    hover:bg-transparent
    hover:text-secondary
    hover:border-secondary
  `};
`;

const FilledButton = styled(BaseButton)`
  ${tw`
    border-primary
    text-primary
    bg-transparent
    hover:bg-secondary
    hover:text-[white]
    hover:border-transparent
  `};
`;

export function Button(props: IButtonProps) {
  const { theme, text, className, externalUrl } = props;

  const handleClick = () => {
    if (externalUrl) {
      if (externalUrl.startsWith("http") || externalUrl.startsWith("www")) {
        // Open external link
        window.open(externalUrl, '_blank');
      } else {
        // Navigate to internal route
        window.location.href = externalUrl;
      }
    }
  };

  if (theme === "filled")
    return (
      <FilledButton className={className} onClick={handleClick}>
        {text}
      </FilledButton>
    );
  else
    return (
      <OutlinedButton className={className} onClick={handleClick}>
        {text}
      </OutlinedButton>
    );
}
