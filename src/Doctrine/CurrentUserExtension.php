<?php

namespace App\Doctrine;

use App\Entity\Course;
use App\Entity\Lesson;
use App\Entity\Student;
use App\Entity\LessonStudents;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use Doctrine\ORM\Query\Lexer;

final class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {

        $user = $this->security->getUser();
        //dd("encore avant");


        if (Course::class === $resourceClass && $this->security->getToken() === null) {
            return;
        }


        if (Course::class === $resourceClass && $this->security->getToken()->getRoleNames()[0] == "ROLES_INSTRUCTORS") {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf('%s.instructor = :current_user', $rootAlias));
            $queryBuilder->setParameter('current_user', $user->getId());
        }

        if (Course::class === $resourceClass && $this->security->getToken()->getRoleNames()[0] == "ROLES_STUDENT") {
        }

        if (Course::class !== $resourceClass ||  null === $user || $this->security->getToken()->getRoleNames()[0] == "ROLES_STUDENT") {

            return;
        }
    }
}
