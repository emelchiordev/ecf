<?Php

namespace App\DataPersister;

use DateTime;
use App\Entity\Course;
use App\Entity\Student;
use App\Entity\Instructor;
use App\Entity\CoursesObject;
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
        if ($data instanceof Instructor && ($context['collection_operation_name'] ?? null) === 'post') {
            $passwordHashed = $this->hasher->hashPassword($data, $data->getPassword());
            $data->setAccountValidate(false);
            $data->setPassword($passwordHashed);
        }

        if ($data instanceof Student && ($context['collection_operation_name'] ?? null) === 'post') {
            $passwordHashed = $this->hasher->hashPassword($data, $data->getPassword());
            $data->setPassword($passwordHashed);
        }

        if ($data instanceof Course && ($context['collection_operation_name'] ?? null) === 'post') {
            $date = new DateTime();
            $data->setPublished(false);
            $data->setDateCreated($date);
            $courseObject = new CoursesObject();
        }
        return $this->decorated->persist($data);
    }

    public function remove($data, array $context = [])
    {
        return $this->decorated->remove($data);
        // call your persistence layer to delete $data
    }
}
