using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ServerGz.Migrations
{
    public partial class InitialCreatcc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    role = table.Column<string>(type: "TEXT", nullable: true),
                    password = table.Column<string>(type: "TEXT", nullable: true),
                    nameReceiver = table.Column<string>(type: "TEXT", nullable: true),
                    phone = table.Column<string>(type: "TEXT", nullable: true),
                    address = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.name);
                });

            migrationBuilder.CreateTable(
                name: "BillStatus",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    shippingDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    received = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillStatus", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Computer",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(type: "TEXT", nullable: true),
                    price = table.Column<double>(type: "REAL", nullable: false),
                    info = table.Column<string>(type: "TEXT", nullable: true),
                    status = table.Column<bool>(type: "INTEGER", nullable: false),
                    orderNum = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Computer", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Bill",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(type: "TEXT", nullable: true),
                    phone = table.Column<string>(type: "TEXT", nullable: true),
                    address = table.Column<string>(type: "TEXT", nullable: true),
                    totalPrice = table.Column<double>(type: "REAL", nullable: false),
                    orderDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    accountName = table.Column<string>(type: "TEXT", nullable: true),
                    billStatusid = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bill", x => x.id);
                    table.ForeignKey(
                        name: "FK_Bill_Account_accountName",
                        column: x => x.accountName,
                        principalTable: "Account",
                        principalColumn: "name",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Bill_BillStatus_billStatusid",
                        column: x => x.billStatusid,
                        principalTable: "BillStatus",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Compon",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    cpu = table.Column<string>(type: "TEXT", nullable: true),
                    screen = table.Column<string>(type: "TEXT", nullable: true),
                    disk = table.Column<string>(type: "TEXT", nullable: true),
                    ram = table.Column<string>(type: "TEXT", nullable: true),
                    pin = table.Column<string>(type: "TEXT", nullable: true),
                    weight = table.Column<string>(type: "TEXT", nullable: true),
                    size = table.Column<string>(type: "TEXT", nullable: true),
                    image = table.Column<string>(type: "TEXT", nullable: true),
                    computerId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Compon", x => x.id);
                    table.ForeignKey(
                        name: "FK_Compon_Computer_computerId",
                        column: x => x.computerId,
                        principalTable: "Computer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BillDetail",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    billId = table.Column<int>(type: "INTEGER", nullable: false),
                    computerId = table.Column<int>(type: "INTEGER", nullable: false),
                    price = table.Column<double>(type: "REAL", nullable: false),
                    quanLiTy = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillDetail", x => x.id);
                    table.ForeignKey(
                        name: "FK_BillDetail_Bill_billId",
                        column: x => x.billId,
                        principalTable: "Bill",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BillDetail_Computer_computerId",
                        column: x => x.computerId,
                        principalTable: "Computer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bill_accountName",
                table: "Bill",
                column: "accountName");

            migrationBuilder.CreateIndex(
                name: "IX_Bill_billStatusid",
                table: "Bill",
                column: "billStatusid");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetail_billId",
                table: "BillDetail",
                column: "billId");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetail_computerId",
                table: "BillDetail",
                column: "computerId");

            migrationBuilder.CreateIndex(
                name: "IX_Compon_computerId",
                table: "Compon",
                column: "computerId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillDetail");

            migrationBuilder.DropTable(
                name: "Compon");

            migrationBuilder.DropTable(
                name: "Bill");

            migrationBuilder.DropTable(
                name: "Computer");

            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "BillStatus");
        }
    }
}
