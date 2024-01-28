interface Props {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const ActionBarLayout = ({ left, center, right }: Props) => {
  return (
    <div className="flex justify-between items-center">
      {left}
      {center}
      {right}
    </div>
  );
};

export default ActionBarLayout;
