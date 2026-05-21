import Image from 'next/image';

export default function PhotoPhil({ size = 220 }: { size?: number }) {
  return (
    <Image
      src="/photo-phil.png"
      alt="Photo Phil celebrating"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
      priority
    />
  );
}
