import csv

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from booking_app.models import Booking, Property
from core.models import UserProfile


class Command(BaseCommand):
    help = "Load bookings from a CSV file into the database"

    def add_arguments(self, parser):
        parser.add_argument("csv_file", type=str, help="Path to the CSV file")
        parser.add_argument(
            "--guest",
            type=str,
            required=True,
            help="Username of the guest to associate with all bookings",
        )

    def handle(self, *args, **options):
        # TODO: Implement the booking loader:
        # 1. Look up the guest by options["guest"] username. Raise CommandError if not found.
        # 2. Open the CSV at options["csv_file"] (raise CommandError if not found).
        # 3. Inside a transaction.atomic() block, iterate rows with csv.DictReader.
        #    For each row, look up the Property by property_id (warn and skip if not found).
        #    Use Booking.objects.get_or_create(property, guest, check_in_date, check_out_date)
        #    with all other fields as defaults. Handle nullable timestamp fields (empty string → None).
        # 4. Print a success summary with the count of created vs. skipped bookings.
        pass
