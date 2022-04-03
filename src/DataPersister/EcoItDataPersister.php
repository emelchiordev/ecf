<?Php

namespace App\DataPersister;

use App\Entity\Instructor;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class EcoItDataPersister implements ContextAwareDataPersisterInterface
{
    private $decorated;
    private $hasher;

    public function __construct(ContextAwareDataPersisterInterface $decorated, UserPasswordHasherInterface $passwordHasher)
    {
        $this->decorated = $decorated;
        $this->hasher = $passwordHasher;
    }

    public function supports($data, array $context = []): bool
    {
        return $this->decorated->supports($data, $context);
    }

    public function persist($data, array $context = [])
    {
        if ($data instanceof Instructor) {
            $passwordHashed = $this->hasher->hashPassword($data, $data->getPassword());
            $data->setPassword($passwordHashed);
        }
        return $this->decorated->persist($data);
    }

    public function remove($data, array $context = [])
    {
        // call your persistence layer to delete $data
    }
}
