import Image from "next/image";
import type { Character } from "types/character";
import styles from "./CharacterCard.module.css";

type CharacterCardProps = { className?: string } & Character;

const CharacterCard = ({
  name,
  image,
  species,
  gender,
  status,
  type,
  className = "",
}: CharacterCardProps) => {
  return (
    <article className={`${styles.wrapper} ${className}`}>
      <Image src={image} alt={name} width={200} height={200} />
      <h2 className={styles.primaryHeading}>{name}</h2>
      <h3 className={styles.secondaryHeading}>
        {species}, {gender}, {status}
      </h3>
      <p className={styles.additionalInfo}>Type: {type}</p>
    </article>
  );
};

export default CharacterCard;
