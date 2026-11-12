import csv

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from booking_app.models import Amenity, Property, PropertyAmenity
from core.models import UserProfile


class Command(BaseCommand):
    help = "Load properties from a CSV file into the database"

    def add_arguments(self, parser):
        parser.add_argument("csv_file", type=str, help="Path to the CSV file")
        parser.add_argument(
            "--host",
            type=str,
            default=None,
            help="Username of the host to assign properties to (defaults to first superuser)",
        )

    def handle(self, *args, **options):
        # TODO: Implement the property loader:
        # 1. Resolve the host: use options["host"] username if provided, else fall back to the first superuser.
        #    Raise CommandError if the user does not exist or no superuser is found.
        # 2. Open the CSV at options["csv_file"] (raise CommandError if not found).
        # 3. Inside a transaction.atomic() block, iterate rows with csv.DictReader.
        #    For each row, use Property.objects.get_or_create(title, city) with all other fields as defaults.
        #    If the property was newly created, parse the pipe-separated "amenities" column and
        #    use get_or_create for each Amenity and PropertyAmenity.
        # 4. Print a success summary with the count of created vs. skipped properties.
        pass
